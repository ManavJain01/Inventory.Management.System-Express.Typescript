import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as warehouseController from "./warehouse.controller";
import * as warehouseValidator from "./warehouse.validation";

const router = Router();

router.get("/", warehouseController.getAllWarehouse);
router.get("/:id", warehouseController.getWarehouseById);
router.get("/allProducts/:id", warehouseController.showAllProductsByWarehouseId);
router.post("/", warehouseValidator.createInventory, catchError, warehouseController.createWarehouse);
router.patch("/:id", warehouseValidator.editInventory, catchError, warehouseController.editWarehouse);
router.put("/:id", warehouseValidator.updateInventory, catchError, warehouseController.updateWarehouse);
router.delete("/:id", warehouseController.deleteWarehouse);

export default router;