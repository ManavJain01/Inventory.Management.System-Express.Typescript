import express from "express";

// Routes
import adminRoutes from "./modules/admin/admin.route";
import userRoutes from "./modules/user/user.route";
import inventoryRoutes from "./modules/inventory/inventory.route"
import warehouseRoutes from "./modules/warehouse/warehouse.route"
import stockRoutes from "./modules/stock level/stock.route"
import commonRoutes from "./modules/common/common.route"

// routes
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/users", userRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/warehouse", warehouseRoutes);
router.use("/stock", stockRoutes);
router.use("/", commonRoutes);

export default router;