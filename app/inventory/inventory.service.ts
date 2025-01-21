import { sendEmail } from "../common/services/email.service";
import { type IInventory } from './inventory.dto';
import { Inventory } from "./inventory.schema";
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { type Response } from 'express'
import mongoose from "mongoose";
import { Stock } from "../stock level/stock.schema";
import { IStock } from "../stock level/stock.dto";
import { IProduct } from "../common/dto/product.dto";
import { Warehouse } from "../warehouse/warehouse.schema";
import { IWarehouse } from "../warehouse/warehouse.dto";

/**
 * Creates a new inventory item and its corresponding stock entry.
 * @param {IProduct} data - The product data containing name, price, warehouse_id, quantity, and lowStockThreshold.
 * @returns {Promise<{inventory: IInventory, stock: IStock}>} - The created inventory and stock entry.
 * @throws {Error} - If any required parameter is missing.
 */
export const createInventory = async (data: IProduct) => {
    const { name, price, warehouse_id, quantity, lowStockThreshold } = data;

    if(!name || !price || !warehouse_id || !quantity || !lowStockThreshold){
        throw new Error("Parameters Missing");
    }

    const product = await Inventory.create({ name, price });

    await product.save();

    const stock = await Stock.create({ product_id: product._id, warehouse_id: warehouse_id, quantity: quantity, lowStockThreshold: lowStockThreshold })

    return { inventory: product, stock };
};

/**
 * Updates an inventory item and optionally its corresponding stock entry.
 * @param {string} id - The ID of the inventory item to update.
 * @param {IProduct} data - The updated product data.
 * @returns {Promise<IInventory>} - The updated inventory item.
 * @throws {Error} - If required fields are missing or the product is not found.
 */
export const updateInventory = async (id: string, data: IProduct) => {
    const { name, price, warehouse_id, quantity, lowStockThreshold } = data;

    if(!name || !price){
        throw new Error("Inventory fields Missing");
    }

    const product = await Inventory.findOneAndUpdate({ _id: id }, { name, price }, {
        new: true,
    });

    if(!product){
        throw new Error("Product not found");
    }

    if(( quantity || lowStockThreshold ) && !warehouse_id){
        throw new Error("warehouse_id missing");
    } else if(warehouse_id && ( quantity || lowStockThreshold )){
        const stockData = { quantity, lowStockThreshold }
        const stock = await Stock.findOneAndUpdate({ "product_id" : id, "warehouse_id" : warehouse_id }, stockData);
        
        if(!stock) throw new Error("Stock Not Found");
        
        if(stock.quantity <= stock.lowStockThreshold){
            const warehouse = await Warehouse.findById(warehouse_id);
            await sendEmailForLowStock(product as IInventory, stock as IStock, warehouse as IWarehouse);
        }
    }

    return product;
};

/**
 * Partially updates an inventory item and optionally its corresponding stock entry.
 * @param {string} id - The ID of the inventory item to update.
 * @param {Partial<IProduct>} data - The partial product data for updating.
 * @returns {Promise<IInventory>} - The updated inventory item.
 * @throws {Error} - If the product is not found or required fields are missing.
 */
export const editInventory = async (id: string, data: Partial<IProduct>) => {
    const { name, price, warehouse_id, quantity, lowStockThreshold } = data;

    const product = await Inventory.findOneAndUpdate({ _id: id }, { name, price });

    if(!product){
        throw new Error("Product not found");
    }

    if(( quantity || lowStockThreshold ) && !warehouse_id){
        throw new Error("warehouse_id missing");
    } else if(warehouse_id && ( quantity || lowStockThreshold )){
        const stockData = { quantity, lowStockThreshold }
        const stock = await Stock.findOneAndUpdate({ "product_id" : id, "warehouse_id" : warehouse_id }, stockData);
        
        if(!stock) throw new Error("Stock Not Found");
        
        if(stock.quantity <= stock.lowStockThreshold){
            const warehouse = await Warehouse.findById(warehouse_id);
            await sendEmailForLowStock(product as IInventory, stock as IStock, warehouse as IWarehouse);
        }
    }

    return product;
};

/**
 * Deletes an inventory item by ID.
 * @param {string} id - The ID of the inventory item to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
export const deleteInventory = async (id: string) => {
    const result = await Inventory.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves an inventory item by its ID.
 * @param {string} id - The ID of the inventory item to retrieve.
 * @returns {Promise<IInventory | null>} - The retrieved inventory item or null if not found.
 */
export const getInventoryById = async (id: string) => {
    const result = await Inventory.findById(id).lean();
    return result;
};

/**
 * Retrieves an inventory item by its ID.
 * @param {string} id - The ID of the inventory item to retrieve.
 * @returns {Promise<IInventory | null>} - The retrieved inventory item or null if not found.
 */
export const getAllInventory = async () => {
    const result = await Inventory.find({}).lean();
    return result;
};

/**
 * Retrieves an inventory item by its ID.
 * @param {string} id - The ID of the inventory item to retrieve.
 * @returns {Promise<IInventory | null>} - The retrieved inventory item or null if not found.
 */
export const getWarehousesById = async (productId :object) => {
    const stocks: [IStock] = await Stock.find({ product_id: productId }).lean();

    if (!stocks) {
        throw new Error("No Stock Found!!!");
    }

    const warehouses: Array<Object> = [];

    // Use for...of loop for async/await to work properly
    for (const stock of stocks) {
        const warehouse = await Warehouse.find({ _id: stock.warehouse_id }); // Find by warehouse_id
        
        if (warehouse.length > 0) {
            warehouses.push(warehouse[0]);
        }
    }

    return warehouses;
};

/**
 * Retrieves an inventory item by its ID.
 * @param {string} id - The ID of the inventory item to retrieve.
 * @returns {Promise<IInventory | null>} - The retrieved inventory item or null if not found.
 */
export const sendEmailForLowStock = async (product :IInventory, stock :IStock, warehouse :IWarehouse) => {
    const mailOptions = {
        from: process.env.MAIL_USER!, // Replace with your sender email
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
 * Retrieves an inventory item by its ID.
 * @param {string} id - The ID of the inventory item to retrieve.
 * @returns {Promise<IInventory | null>} - The retrieved inventory item or null if not found.
 */
const fetchProductWithTimeStamp = async (startDate :string, endDate :string) => {
    // Validate and parse dates
    const start = startDate ? new Date(startDate as string) : null;
    const end = endDate ? new Date(endDate as string) : null;
    
    // Create filter conditions
    const filter: mongoose.FilterQuery<typeof Inventory> = {};
    if (start) filter.createdAt = { $gte: start };

    if (end) filter.createdAt = { ...filter.createdAt, $lte: end };

    // Fetch data with filtering
    return await Inventory.find(filter).lean();
}

/**
 * Generates a CSV report of inventory data.
 * @param {string} startDate - The start date for filtering data.
 * @param {string} endDate - The end date for filtering data.
 * @returns {Promise<string>} - The generated CSV string.
 */
export const csvReport = async (startDate :string, endDate: string) => {
    // let inventoryData :Array<Object> = [];

    // if(startDate && endDate){
    //     inventoryData = await fetchProductWithTimeStamp(startDate, endDate);     
    // } else {
    //     inventoryData = await getAllInventory();
    // }
    
    // const fields = ['name', 'price', 'warehouse', 'lowStockThreshold']; // Fields for CSV
    // const parser = new Parser({ fields });
    // return parser.parse(inventoryData);

    const fields = ['name', 'price', 'warehouse', 'location', 'quantity', 'lowStockThreshold'];

    // Fetch data from the database
    const stock: IStock[] = await Stock.find({}).lean();
    const inventory: IInventory[] = await Inventory.find({}).lean();
    const warehouses: IWarehouse[] = await Warehouse.find({}).lean();

    // Flatten data by joining inventory, warehouse, and stock
    const flattenedData = stock.map((stockEntry) => {
        const product = inventory.find((item) => item._id.toString() === stockEntry.product_id.toString());
        const warehouse = warehouses.find((wh) => wh._id.toString() === stockEntry.warehouse_id.toString());

        return {
            name: product?.name || 'Unknown',
            price: product?.price || 0,
            warehouse: warehouse?.name || 'Unknown',
            location: warehouse?.location || 'Unknown',
            quantity: stockEntry.quantity,
            lowStockThreshold: stockEntry.lowStockThreshold,
        };
    });

    // Convert the flattened data into CSV
    const parser = new Parser({ fields });
    const csv = parser.parse(flattenedData);
    return csv
};

/**
 * Generates a PDF report of inventory data.
 * @param {Response} res - The Express response object for sending the PDF.
 * @param {string} startDate - The start date for filtering data.
 * @param {string} endDate - The end date for filtering data.
 * @returns {Promise<void>} - Resolves after generating the PDF.
 */
export const pdfReport = async (res: Response, startDate :string, endDate :string) => {
    const doc = new PDFDocument();
    const fileName = 'inventory-report.pdf';
    
    res.header('Content-Type', 'application/pdf');
    res.attachment(fileName);
    
    doc.pipe(res);
    
    doc.fontSize(20).text('Inventory Report', { align: 'center' });
    doc.moveDown();
    
    let inventoryData :Array<IInventory> = await Inventory.find({}).lean();

    if(startDate && endDate){
        inventoryData = await fetchProductWithTimeStamp(startDate, endDate);     
    } else {
        inventoryData = await getAllInventory();
    }

    inventoryData.forEach(item => {
        doc.fontSize(12).text(`Name: ${item.name} | Price: ${item.price}`);
    });

    doc.end();
};