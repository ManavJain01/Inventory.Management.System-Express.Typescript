
import { body } from 'express-validator';

export const createInventory = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('quantity').notEmpty().withMessage('quantity is required').withMessage('quantity must be a number'),
    body('warehouse').notEmpty().withMessage('warehouse is required').isString().withMessage('warehouse must be a string'),
    body('lowStockThreshold').notEmpty().withMessage('lowStockThreshold is required').withMessage('lowStockThreshold must be a number'),
];

export const updateInventory = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('quantity').notEmpty().withMessage('quantity is required').withMessage('quantity must be a number'),
    body('warehouse').notEmpty().withMessage('warehouse is required').isString().withMessage('warehouse must be a string'),
    body('lowStockThreshold').notEmpty().withMessage('lowStockThreshold is required').withMessage('lowStockThreshold must be a number'),
];

export const editInventory = [
    body('name').isString().withMessage('name must be a string'),
    body('quantity').withMessage('quantity must be a number'),
    body('warehouse').isString().withMessage('warehouse must be a string'),
    body('lowStockThreshold').withMessage('lowStockThreshold must be a number'),
];