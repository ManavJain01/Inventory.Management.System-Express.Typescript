
import mongoose, { model } from "mongoose";
import { type IStock } from "./stock.dto";
const Schema = mongoose.Schema;

const StockSchema = new Schema<IStock>({
    product_id: { type: Schema.ObjectId, ref: 'Inventory', required: true },
    warehouse_id: { type: Schema.ObjectId, ref: 'Warehouse', required: true },
    quantity: { type: Number, required: true },
    lowStockThreshold: { type: Number, required: true },
}, { timestamps: true });

StockSchema.pre("save", async function (next) {
    next();
});

// Exporting models
const Stock = model<IStock>("Stock", StockSchema);

export { Stock };