
import { body } from 'express-validator';

/**
 * Validation rules for creating an inventory item.
 *
 * @constant
 * @type {Array}
 */
export const createInventory = [
    body('product_id').notEmpty().withMessage('product_id is required').isString().withMessage('product_id must be a string'),
    body('warehouse_id').notEmpty().withMessage('warehouse_id is required').isString().withMessage('warehouse_id must be a string'),
    body('quantity').notEmpty().withMessage('quantity is required').withMessage('quantity must be a number'),
    body('lowStockThreshold').notEmpty().withMessage('lowStockThreshold is required').withMessage('lowStockThreshold must be a number'),
];

/**
 * Validation rules for updating an inventory item.
 *
 * @constant
 * @type {Array}
 */
export const updateInventory = [
    body('product_id').notEmpty().withMessage('product_id is required').isString().withMessage('product_id must be a string'),
    body('warehouse_id').notEmpty().withMessage('warehouse_id is required').isString().withMessage('warehouse_id must be a string'),
    body('quantity').notEmpty().withMessage('quantity is required').withMessage('quantity must be a number'),
    body('lowStockThreshold').notEmpty().withMessage('lowStockThreshold is required').withMessage('lowStockThreshold must be a number'),
];

/**
 * Validation rules for editing an inventory item.
 * Allows partial updates.
 *
 * @constant
 * @type {Array}
 */
export const editInventory = [
    body('product_id').isString().withMessage('product_id must be a string'),
    body('warehouse_id').isString().withMessage('warehouse_id must be a string'),
    body('quantity').withMessage('quantity must be a number'),
    body('lowStockThreshold').withMessage('lowStockThreshold must be a number'),
];