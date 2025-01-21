import { Router } from "express";
import * as authController from "./auth.controller";
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";
// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../../docs/swagger.json"
// import swaggerJsonFile from "../../../swagger/swagger.json"

const router = Router();

router.get("/refresh-token", roleAuthMiddleware, authController.refreshAccessToken);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));

export default router;