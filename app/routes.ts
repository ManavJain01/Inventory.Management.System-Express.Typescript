import express from "express";

// Routes
import adminRoutes from "./admin/admin.route";
import userRoutes from "./user/user.route";
import * as userController from "./user/user.controller";
import { roleAuthMiddleware } from "./common/middleware/role-auth.middleware"

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../docs/swagger.json"
// import swaggerJsonFile from "../swagger/swagger.json"
import { catchError } from "./common/middleware/cath-error.middleware";

// routes
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/users", roleAuthMiddleware, userRoutes);
router.post("/login", catchError, userController.loginUser);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
export default router;