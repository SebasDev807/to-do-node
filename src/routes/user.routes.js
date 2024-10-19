import { confirmAccount, createAccount, desactiveUser } from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

//TODO:AÑADIR VALIDACIONES
userRouter.post('/register', createAccount);

//TODO:AÑADIR VALIDACIONES
userRouter.get('/verify/:token', confirmAccount);

//TODO:AÑADIR VALIDACIONES
userRouter.delete('/:id', desactiveUser);

export default userRouter;