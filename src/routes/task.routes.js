import { Router } from "express";
import { createTask, deleteTask, findAllPaginated, findTaskByTerm, updateTask } from "../controllers/task.controller.js";
import { checkValidationResult } from "../middlewares/check-validation-result.js";
import { check } from "express-validator";
import { isValidEnum } from "../helpers/check-enum.js";
const taskRouter = Router();


taskRouter.post('/', [
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
    check('id','Invalid Mongo Id').isMongoId(),
    checkValidationResult
], deleteTask);


taskRouter.get('/:term', findTaskByTerm);


taskRouter.get('/', findAllPaginated);



export default taskRouter;