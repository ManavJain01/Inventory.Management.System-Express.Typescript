
import { body } from 'express-validator';

export const signupUser = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string'),
];

export const loginUser = [
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be string'),
];

export const resetPassword = [
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string'),
];