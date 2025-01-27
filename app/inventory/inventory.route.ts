import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as inventoryController from "./inventory.controller";
import * as inventoryValidator from "./inventory.validation";

const router = Router();

router.get("/", inventoryController.getAllInventory);
router.get("/report-csv", inventoryController.csvReport);
router.get("/report-pdf", inventoryController.pdfReport);
router.get("/search", inventoryController.filteredProducts);
router.get("/:id", inventoryController.getInventoryById);
router.get("/allwarehouses/:id", inventoryController.getWarehousesById);
router.post("/", inventoryValidator.createInventory, catchError, inventoryController.createInventory);
router.patch("/:id", inventoryValidator.editInventory, catchError, inventoryController.editInventory);
router.put("/:id", inventoryValidator.updateInventory, catchError, inventoryController.updateInventory);
router.delete("/:id", inventoryController.deleteInventory);



export default router;