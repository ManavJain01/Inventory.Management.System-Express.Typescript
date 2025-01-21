
import mongoose, { model } from "mongoose";
import { type IInventory } from "./inventory.dto";

const Schema = mongoose.Schema;

const InventorySchema = new Schema<IInventory>({
        name: { type: String, required: true },
        price: { type: Number, required: true },
}, { timestamps: true });

InventorySchema.pre("save", async function (next) {
    next();
});


// Exporting models
const Inventory = model<IInventory>("Inventory", InventorySchema);

export { Inventory };