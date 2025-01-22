import { sendEmail } from "../common/services/email.service";
import { type IInventory } from './inventory.dto';
import { Inventory } from "./inventory.entity";
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { type Response } from 'express'
import mongoose from "mongoose";
import { Stock } from "../stock level/stock.entity";
import { IStock } from "../stock level/stock.dto";
import { IProduct } from "../common/entity/product.entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { IWarehouse } from "../warehouse/warehouse.dto";
import { Repository } from "typeorm";
import { AppDataSource } from "../common/services/data-source";

const inventoryRepository: Repository<Inventory> = AppDataSource.getRepository(Inventory);
const stockRepository: Repository<Stock> = AppDataSource.getRepository(Stock);
const warehouseRepository: Repository<Warehouse> = AppDataSource.getRepository(Warehouse);

/**
 * Creates a new inventory item along with stock.
 * @param {IProduct} data - The product data containing name, price, warehouse_id, quantity, and lowStockThreshold.
 * @returns {Promise<{inventory: Inventory, stock: Stock}>} - The created inventory and stock.
 * @throws {Error} - If required parameters are missing.
 */
export const createInventory = async (data: IProduct) => {
    const { name, price, warehouse_id, quantity, lowStockThreshold } = data;

    if (!name || !price || !warehouse_id || !quantity || !lowStockThreshold) {
        throw new Error("Parameters Missing");
    }

    const product = inventoryRepository.create({ name, price });
    await inventoryRepository.save(product);

    const stock = stockRepository.create({
        product_id: product.id,
        warehouse_id: warehouse_id,
        quantity: quantity,
        lowStockThreshold: lowStockThreshold
    });
    await stockRepository.save(stock);

    return { inventory: product, stock };
};

/**
 * Updates an existing inventory item and its stock if needed.
 * @param {number} id - The ID of the inventory to update.
 * @param {IProduct} data - The updated product data.
 * @returns {Promise<Inventory>} - The updated inventory.
 * @throws {Error} - If inventory fields are missing or if the product or stock is not found.
 */
export const updateInventory = async (id: number, data: IProduct) => {
    const { name, price, warehouse_id, quantity, lowStockThreshold } = data;

    if (!name || !price) {
        throw new Error("Inventory fields Missing");
    }

    let product = await inventoryRepository.findOneBy({ id });
    if (!product) {
        throw new Error("Product not found");
    }

    product = await inventoryRepository.save({ ...product, name, price });

    if ((quantity || lowStockThreshold) && !warehouse_id) {
        throw new Error("warehouse_id missing");
    } else if (warehouse_id && (quantity || lowStockThreshold)) {
        const stock = await stockRepository.findOne({ where: { product_id: id, warehouse_id } });
        if (!stock) {
            throw new Error("Stock Not Found");
        }

        stock.quantity = quantity;
        stock.lowStockThreshold = lowStockThreshold;
        await stockRepository.save(stock);

        if (stock.quantity <= stock.lowStockThreshold) {
            const warehouse = await warehouseRepository.findOneBy({ id: warehouse_id });
            await sendEmailForLowStock(product, stock, warehouse as IWarehouse);
        }
    }

    return product;
};

/**
 * Partially updates an existing inventory item and its stock if needed.
 * @param {number} id - The ID of the inventory to update.
 * @param {Partial<IProduct>} data - The partial product data to update.
 * @returns {Promise<UpdateResult>} - The result of the product update operation.
 * @throws {Error} - If the product or stock is not found or warehouse_id is missing when required.
 */
export const editInventory = async (id: number, data: Partial<IProduct>) => {
    const { name, price, warehouse_id, quantity, lowStockThreshold } = data;

    const productUpdateResult = await inventoryRepository.update({ id: id }, { name, price });

    if (productUpdateResult.affected === 0) {
        throw new Error("Product not found");
    }

    if ((quantity || lowStockThreshold) && !warehouse_id) {
        throw new Error("warehouse_id missing");
    }

    if (warehouse_id && (quantity || lowStockThreshold)) {
        const stockData = { quantity, lowStockThreshold };

        const stockUpdateResult = await stockRepository.update(
            { "product_id": id, "warehouse_id": warehouse_id },
            stockData
        );

        if (stockUpdateResult.affected === 0) {
            throw new Error("Stock Not Found");
        }

        const stock = await stockRepository.findOne({ where: { "product_id": id, "warehouse_id": warehouse_id } });

        if (stock && stock.quantity <= stock.lowStockThreshold) {
            const warehouse = await warehouseRepository.findOne({ where: { id: warehouse_id } });

            if (!warehouse) {
                throw new Error("Warehouse not found");
            }

            const product = await inventoryRepository.findOne({ where: { id } });

            await sendEmailForLowStock(product as IInventory, stock as IStock, warehouse as IWarehouse);
        }
    }

    return productUpdateResult;
};

/**
 * Deletes an inventory item by its ID.
 * @param {number} id - The ID of the inventory to delete.
 * @returns {Promise<DeleteResult>} - The result of the delete operation.
 */
export const deleteInventory = async (id: number) => {
    const inventoryRepository: Repository<Inventory> = AppDataSource.getRepository(Inventory);
    const result = await inventoryRepository.delete(id);
    return result;
};

/**
 * Retrieves an inventory item by its ID.
 * @param {number} id - The ID of the inventory to retrieve.
 * @returns {Promise<Inventory | null>} - The retrieved inventory or null if not found.
 */
export const getInventoryById = async (id: number) => {
    const inventoryRepository: Repository<Inventory> = AppDataSource.getRepository(Inventory);
    const result = await inventoryRepository.findOneBy({ id });
    return result;
};

/**
 * Retrieves all inventory items.
 * @returns {Promise<Inventory[]>} - All inventory items.
 */
export const getAllInventory = async () => {
    const inventoryRepository: Repository<Inventory> = AppDataSource.getRepository(Inventory);
    const result = await inventoryRepository.find();
    return result;
};

/**
 * Retrieves all warehouses associated with a given product ID.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<Warehouse[]>} - All warehouses associated with the product.
 * @throws {Error} - If no stock is found for the product.
 */
export const getWarehousesById = async (productId: number) => {
    const stockRepository: Repository<Stock> = AppDataSource.getRepository(Stock);
    const warehouseRepository: Repository<Warehouse> = AppDataSource.getRepository(Warehouse);

    const stocks = await stockRepository.find({ where: { product_id: productId } });

    if (!stocks || stocks.length === 0) {
        throw new Error("No Stock Found!!!");
    }

    const warehouses = [];
    for (const stock of stocks) {
        const warehouse = await warehouseRepository.findOneBy({ id: stock.warehouse_id });
        if (warehouse) {
            warehouses.push(warehouse);
        }
    }

    return warehouses;
};

/**
 * Sends an email alert for low stock of a product in a warehouse.
 * @param {IInventory} product - The product with low stock.
 * @param {IStock} stock - The stock details.
 * @param {IWarehouse} warehouse - The warehouse where the stock is low.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sendEmailForLowStock = async (product :IInventory, stock :IStock, warehouse :IWarehouse) => {
    const mailOptions = {
        from: process.env.MAIL_USER!,
        to: "rocker17manav@gmail.com",
        subject: `Low Stock Alert: ${product.name}`,
        html: `
            <p>Dear Admin,</p>
            <p>We noticed that the following product is running low in the warehouse inventory:</p>
            <ul>
                <li><strong>Product Name:</strong> ${product.name}</li>
                <li><strong>Warehouse:</strong> ${warehouse.name}, <strong>Location:</strong> ${warehouse.location}</li>
                <li><strong>Stock Quantity:</strong> ${stock.quantity}</li>
                <li><strong>It is advisable to store atleast </strong>${stock.lowStockThreshold + 1}</li>
            </ul>
            <p>Please take the necessary action to restock this item.</p>
            <p>Thank you,</p>
            <p>Your Inventory Management Team</p>
        `
    };

    await sendEmail(mailOptions);
}

/**
 * Fetches products created within a specific date range.
 * @param {string} startDate - The start date of the range.
 * @param {string} endDate - The end date of the range.
 * @returns {Promise<IInventory[]>} - Products created within the date range.
 * @throws {Error} - If the date range is invalid.
 */
const fetchProductWithTimeStamp = async (startDate: string, endDate: string) => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && isNaN(start.getTime())) {
        throw new Error("Invalid start date");
    }
    if (end && isNaN(end.getTime())) {
        throw new Error("Invalid end date");
    }

    const filter: mongoose.FilterQuery<typeof Inventory> = {};

    if (start) {
        filter.createdAt = { $gte: start };
    }

    if (end) {
        if (filter.createdAt) {
            filter.createdAt.$lte = end;
        } else {
            filter.createdAt = { $lte: end };
        }
    }

    return [];
};

/**
 * Generates a CSV report of inventory data.
 * @param {string} startDate - The start date for filtering inventory.
 * @param {string} endDate - The end date for filtering inventory.
 * @returns {Promise<string>} - The generated CSV content.
 */
export const csvReport = async (startDate: string, endDate: string) => {
    const stockRepository: Repository<Stock> = AppDataSource.getRepository(Stock);
    const inventoryRepository: Repository<Inventory> = AppDataSource.getRepository(Inventory);
    const warehouseRepository: Repository<Warehouse> = AppDataSource.getRepository(Warehouse);

    const stock = await stockRepository.find();
    const inventory = await inventoryRepository.find();
    const warehouses = await warehouseRepository.find();

    const flattenedData = stock.map((stockEntry) => {
        const product = inventory.find(item => item.id === stockEntry.product_id);
        const warehouse = warehouses.find(wh => wh.id === stockEntry.warehouse_id);

        return {
            name: product?.name || 'Unknown',
            price: product?.price || 0,
            warehouse: warehouse?.name || 'Unknown',
            location: warehouse?.location || 'Unknown',
            quantity: stockEntry.quantity,
            lowStockThreshold: stockEntry.lowStockThreshold,
        };
    });

    const fields = ['name', 'price', 'warehouse', 'location', 'quantity', 'lowStockThreshold'];
    const parser = new Parser({ fields });
    const csv = parser.parse(flattenedData);
    return csv;
};

/**
 * Generates a PDF report of inventory data and sends it in the response.
 * @param {Response} res - The response object to send the PDF.
 * @param {string} startDate - The start date for filtering inventory.
 * @param {string} endDate - The end date for filtering inventory.
 * @returns {Promise<void>} - A promise that resolves when the PDF is sent.
 */
export const pdfReport = async (res: Response, startDate: string, endDate: string) => {
    const doc = new PDFDocument();
    const fileName = 'inventory-report.pdf';
    
    res.header('Content-Type', 'application/pdf');
    res.attachment(fileName);
    
    doc.pipe(res);
    
    doc.fontSize(20).text('Inventory Report', { align: 'center' });
    doc.moveDown();
    
    let inventoryData: IInventory[] = await inventoryRepository.find();

    if (startDate && endDate) {
        inventoryData = await fetchProductWithTimeStamp(startDate, endDate);
    }

    inventoryData.forEach(item => {
        doc.fontSize(12).text(`Name: ${item.name} | Price: ${item.price}`);
    });

    doc.end();
};
