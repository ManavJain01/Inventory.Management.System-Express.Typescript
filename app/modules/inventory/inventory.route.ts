import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as inventoryController from "./inventory.controller";
import * as inventoryValidator from "./inventory.validation";

const router = Router();

router.get("/", inventoryController.getAllInventory);
router.get("/:id", inventoryController.getInventoryById);
// router.post("/", inventoryValidator.createInventory, catchError, inventoryController.createInventory);
// router.patch("/", inventoryValidator.editInventory, catchError, inventoryController.editInventory);
// router.put("/", inventoryValidator.updateInventory, catchError, inventoryController.updateInventory);
router.delete("/:id", inventoryController.deleteInventory);

export default router;