import { sendEmail } from "../../common/services/email.service";
import { type IInventory } from "./inventory.dto";
import { Inventory } from "./inventory.schema";
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { type Response } from 'express'
import mongoose from "mongoose";

export const createInventory = async (data: IInventory) => {
    const result = await Inventory.create({ ...data });

    await result.save();

    return { inventory: result };
};

export const updateInventory = async (id: string, data: IInventory) => {
    const result = await Inventory.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editInventory = async (id: string, data: Partial<IInventory>) => {
    const result = await Inventory.findOneAndUpdate({ _id: id }, data);

    if(!result){
        throw new Error("Product not found");
    }

    if(result.quantity <= result.lowStockThreshold){
        await sendEmailForLowStock(result as IInventory);
    }

    return result;
};

export const deleteInventory = async (id: string) => {
    const result = await Inventory.deleteOne({ _id: id });
    return result;
};

export const getInventoryById = async (id: string) => {
    const result = await Inventory.findById(id).lean();
    return result;
};

export const getAllInventory = async () => {
    const result = await Inventory.find({}).lean();
    return result;
};

export const sendEmailForLowStock = async (product: IInventory) => {
    const mailOptions = {
        from: process.env.MAIL_USER!, // Replace with your sender email
        to: "rocker17manav@gmail.com",
        subject: `Low Stock Alert: ${product.name}`,
        html: `
            <p>Dear Admin,</p>
            <p>We noticed that the following product is running low in the warehouse inventory:</p>
            <ul>
                <li><strong>Product Name:</strong> ${product.name}</li>
                <li><strong>Stock Count:</strong> ${product.quantity}</li>
                <li><strong>Warehouse:</strong> ${product.warehouse}</li>
                <li><strong>Atleast store </strong> ${product.lowStockThreshold + 1} items</li>
            </ul>
            <p>Please take the necessary action to restock this item.</p>
            <p>Thank you,</p>
            <p>Your Inventory Management Team</p>
        `
    };

    await sendEmail(mailOptions);
}

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

export const csvReport = async (startDate :string, endDate: string) => {
    let inventoryData :Array<Object> = [];

    if(startDate && endDate){
        inventoryData = await fetchProductWithTimeStamp(startDate, endDate);     
    } else {
        inventoryData = await getAllInventory();
    }
    
    const fields = ['name', 'quantity', 'warehouse', 'lowStockThreshold']; // Fields for CSV
    const parser = new Parser({ fields });
    return parser.parse(inventoryData);
};

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
        doc.fontSize(12).text(`Name: ${item.name} | Quantity: ${item.quantity} | Warehouse: ${item.warehouse} | Threshold Stock: ${item.lowStockThreshold}`);
    });

    doc.end();
};