
import { body } from 'express-validator';

export const createInventory = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('price').notEmpty().withMessage('price is required').isNumeric().withMessage('price must be a number'),
];

export const updateInventory = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('price').notEmpty().withMessage('price is required').isNumeric().withMessage('price must be a number'),
];

export const editInventory = [
    body('name').isString().withMessage('name must be a string'),
    body('price').isNumeric().withMessage('price must be a number'),
];