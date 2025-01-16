import { Router } from "express";
import * as commonController from "./common.controller";
import { roleAuthMiddleware } from "../../common/middleware/role-auth.middleware";
// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../../../swagger/show_swagger.json"

const router = Router();

router.get("/refresh-token", roleAuthMiddleware, commonController.refreshAccessToken);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));

export default router;