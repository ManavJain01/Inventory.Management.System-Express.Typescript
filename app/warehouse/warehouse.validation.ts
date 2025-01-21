
import { body } from 'express-validator';

export const createInventory = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('location').notEmpty().withMessage('location is required').isString().withMessage('location must be a string'),
];

export const updateInventory = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('location').notEmpty().withMessage('location is required').isString().withMessage('location must be a string'),
];

export const editInventory = [
    body('name').isString().withMessage('name must be a string'),
    body('location').isString().withMessage('location must be a string'),
];