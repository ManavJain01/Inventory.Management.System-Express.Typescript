import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { roleAuthMiddleware } from "../../common/middleware/role-auth.middleware";

const router = Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.post("/", userValidator.createUser, catchError, userController.createUser);
router.patch("/:id", catchError, userController.editUser);
router.put("/:id", catchError, userController.updateUser);
router.post("/login", catchError, userController.loginUser);
router.post("/logout", catchError, roleAuthMiddleware, userController.logoutUser);

export default router;