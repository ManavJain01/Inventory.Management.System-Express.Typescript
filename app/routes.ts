import express from "express";
import { roleAuthMiddleware } from "./common/middleware/role-auth.middleware"

// Routes
import adminRoutes from "./modules/admin/admin.route";
import userRoutes from "./modules/user/user.route";
import inventoryRoutes from "./modules/inventory/inventory.route"
// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../docs/swagger.json"
// import swaggerJsonFile from "../swagger/swagger.json"

// routes
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/users", roleAuthMiddleware, userRoutes);
router.use("/inventory", inventoryRoutes);
// router.post("/login", catchError, userController.loginUser);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
export default router;