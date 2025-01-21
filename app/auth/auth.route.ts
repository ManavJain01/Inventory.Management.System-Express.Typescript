import { Router } from "express";
import * as authController from "./auth.controller";
import * as authValidation from "./auth.validation"
import { catchError } from "../common/middleware/cath-error.middleware";
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";

const router = Router();

router.post("/login", authValidation.loginUser, catchError, authController.loginUser);
router.post("/logout", catchError, roleAuthMiddleware(["USER", "ADMIN"]), authController.logoutUser);
router.post("/forgot-password", catchError, authController.forgotPassword);
router.post("/reset-password", authValidation.resetPassword,catchError, authController.resetPassword);
router.post("/refresh-token", catchError, authController.refreshAccessToken);

export default router;