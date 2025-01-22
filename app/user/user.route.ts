import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";
import { userEnum } from "./user.dto";

const router = Router();

router.get("/", roleAuthMiddleware([...userEnum]), userController.getAllUser);
router.get("/:id", roleAuthMiddleware([...userEnum]), userController.getUserById);
router.delete("/:id", roleAuthMiddleware([...userEnum]), userController.deleteUser);
router.post("/", userValidator.createUser, catchError, userController.createUser);
router.patch("/:id", roleAuthMiddleware([...userEnum]), userValidator.editUser, catchError, userController.editUser);
router.put("/:id", roleAuthMiddleware([...userEnum]), userValidator.updateUser, catchError, userController.updateUser);

export default router;