import express from "express";

// Routes
import adminRoutes from "./admin/admin.route";
import userRoutes from "./user/user.route";
import inventoryRoutes from "./inventory/inventory.route"
import warehouseRoutes from "./warehouse/warehouse.route"
import stockRoutes from "./stock level/stock.route"
import authRoutes from "./auth/auth.route"

// routes
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/users", userRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/warehouse", warehouseRoutes);
router.use("/stock", stockRoutes);
router.use("/", authRoutes);

export default router;