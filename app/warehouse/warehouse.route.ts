import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as warehouseController from "./warehouse.controller";
import * as warehouseValidator from "./warehouse.validation";

const router = Router();

router.get("/", warehouseController.getAllWarehouse);
router.get("/:id", warehouseController.getWarehouseById);
router.post("/", warehouseController.createWarehouse);
router.patch("/:id", warehouseController.editWarehouse);
router.put("/:id", warehouseController.updateWarehouse);
router.delete("/:id", warehouseController.deleteWarehouse);

export default router;