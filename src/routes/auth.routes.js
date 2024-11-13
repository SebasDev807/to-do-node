import { login } from '../controllers/auth.controller.js';
import { Router } from 'express';
import { check } from 'express-validator';
import { checkValidationResult } from '../middlewares/check-validation-result.js';

const authRouter = Router();

//TODO: Añadir validaciones
authRouter.post('/login', [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    checkValidationResult
], login);


export default authRouter;