import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as stockController from "./stock.controller";
import * as stockValidator from "./stock.validation";

const router = Router();

router.get("/", stockController.getAllStock);
router.get("/:id", stockController.getStockById);
router.post("/", stockController.createStock);
router.patch("/:id", stockController.editStock);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

export default router;