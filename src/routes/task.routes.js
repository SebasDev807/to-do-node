import { Router } from "express";
import { createTask, deleteTask, findAllPaginated, findTaskByTerm, updateTask } from "../controllers/task.controller.js";
import { checkValidationResult } from "../middlewares/check-validation-result.js";
import { check } from "express-validator";
import { isValidEnum } from "../helpers/check-enum.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
const taskRouter = Router();

//TODO: Validar roles [ADMIN, USER]

//Validaciones antes de llegar al controlador
//En esta ruta validamos los campos para subir
//una tarea, previo a esto es necesario haber iniciado 
//Sesion, si no no se podra realizar el post de la tarea
taskRouter.post('/', [
    validateJWT,
    check('title', 'Title must be more than 5 characters.')
        .isLength({ min: 5, max: 50 }),

    check('description', 'The description can only be 200 characters.')
        .isLength({ max: 200 }),

    check('status', 'status only can only have PENDING, IN PROGRESS & COMPLETED')
        .optional()
        .custom(value => isValidEnum(value, ['PENDING', 'IN PROGRESS', 'COMPLETED'])),

    check('deadLine', 'Invalid format for date, date must be DD-MM-YYYY ')
        .optional()
        .isISO8601()
        .toDate(),

    checkValidationResult
], createTask);


taskRouter.put('/:id', [
    validateJWT,
    check('id', 'Invalid Mongo ID').isMongoId(),
    check('title', 'Title must be more than 5 characters.')
        .optional()
        .isLength({ min: 5, max: 50 }),

    check('description', 'The description can only be 200 characters.')
        .optional()
        .isLength({ max: 200 }),

    check('status', 'status only can only have PENDING, IN PROGRESS & COMPLETED')
        .optional()
        .custom(value => isValidEnum(value, ['PENDING', 'IN PROGRESS', 'COMPLETED'])),

    check('deadLine', 'Invalid format for date, date must be DD-MM-YYYY ')
        .optional()
        .isISO8601()
        .toDate(),
    checkValidationResult
], updateTask);


taskRouter.delete('/:id', [
    validateJWT,
    check('id', 'Invalid Mongo Id').isMongoId(),
    checkValidationResult
], deleteTask);


taskRouter.get('/:term', findTaskByTerm);


taskRouter.get('/', findAllPaginated);



export default taskRouter;