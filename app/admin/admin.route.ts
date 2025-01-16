
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as adminController from "./admin.controller";

const router = Router();

router.post("/", catchError, adminController.createUser);
router.post("/login", adminController.getUserByLogin)
router.patch("/restrict-user/:id", adminController.restrictUser)
router.get("/active-sessions", adminController.activeSessions)

export default router;