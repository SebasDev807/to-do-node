import { check } from "express-validator";
import { confirmAccount, createAccount, desactiveUser } from "../controllers/user.controller.js";
import { Router } from "express";
import { checkValidationResult } from "../middlewares/check-validation-result.js";
const userRouter = Router();


userRouter.post('/register', [
    check('username', 'username must be more than 5 characters')
    .not().isEmpty()
    .isString({ min: 5 }),
    check('email', 'invalid email format').isEmail(),
    check('password', 'password is required').isString({ min: 6 }),

    checkValidationResult //faltaba agregar esto
    

], createAccount);


userRouter.get('/verify/:token', confirmAccount);


userRouter.delete('/:id', [
    check('id', 'Invalid mongoId.').isMongoId()
], desactiveUser);

export default userRouter;