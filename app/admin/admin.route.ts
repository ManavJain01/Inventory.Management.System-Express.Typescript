
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as adminController from "./admin.controller";

const router = Router();

router.post("/", catchError, adminController.createUser);
router.post("/login", adminController.loginUser)

export default router;