import express from "express";
import swaggerUi from "swagger-ui-express";
// import swaggerJsonFile from "../swagger-output.json"
import swaggerJsonFile from "../docs/swagger.json"

// Routes
import userRoutes from "./user/user.route";
import inventoryRoutes from "./inventory/inventory.route"
import warehouseRoutes from "./warehouse/warehouse.route"
import stockRoutes from "./stock level/stock.route"
import authRoutes from "./auth/auth.route"
import { roleAuthMiddleware } from "./common/middleware/role-auth.middleware";

// routes
const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
router.use("/users", userRoutes);
router.use("/inventory", roleAuthMiddleware(["ADMIN", "MANAGER"]), inventoryRoutes);
router.use("/warehouse", roleAuthMiddleware(["ADMIN"]), warehouseRoutes);
router.use("/stock", roleAuthMiddleware(["ADMIN", "MANAGER"]), stockRoutes);
router.use("/", authRoutes);

export default router;