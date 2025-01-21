import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as stockController from "./stock.controller";
import * as stockValidator from "./stock.validation";

const router = Router();

router.get("/", stockController.getAllStock);
router.get("/:id", stockController.getStockById);
router.post("/", stockValidator.createInventory, catchError, stockController.createStock);
router.patch("/:id", stockValidator.editInventory, catchError, stockController.editStock);
router.put("/:id", stockValidator.updateInventory, catchError, stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

export default router;