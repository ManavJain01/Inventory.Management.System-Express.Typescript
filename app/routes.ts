import express from "express";

// Routes
import userRoutes from "./user/user.route";
import inventoryRoutes from "./inventory/inventory.route"
import warehouseRoutes from "./warehouse/warehouse.route"
import stockRoutes from "./stock level/stock.route"
import authRoutes from "./auth/auth.route"
import { roleAuthMiddleware } from "./common/middleware/role-auth.middleware";

// routes
const router = express.Router();

router.use("/users", roleAuthMiddleware(["USER", "ADMIN"]), userRoutes);
router.use("/inventory", roleAuthMiddleware(["ADMIN"]), inventoryRoutes);
router.use("/warehouse", roleAuthMiddleware(["ADMIN"]), warehouseRoutes);
router.use("/stock", roleAuthMiddleware(["ADMIN"]), stockRoutes);
router.use("/", authRoutes);

export default router;