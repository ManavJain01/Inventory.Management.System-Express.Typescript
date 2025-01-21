
import mongoose, { model } from "mongoose";
import { type IWarehouse } from "./warehouse.dto";
const Schema = mongoose.Schema;

const WarehouseSchema = new Schema<IWarehouse>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    managerId: { type: Object, required: true },
}, { timestamps: true });

WarehouseSchema.pre("save", async function (next) {
    next();
});

// Exporting models
const Warehouse = model<IWarehouse>("Warehouse", WarehouseSchema);

export { Warehouse };