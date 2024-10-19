import { request, response } from "express";
import Task from '../models/task.model.js';
import { isValidObjectId } from "mongoose";



export const createTask = async (req = request, res = response) => {

    const { status, ...data } = req.body;

    try {

        const task = await Task.create({
            status: status ? status.toUpperCase() : undefined,
            ...data
        });

        return res.status(201).json({ task });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'something went broke'
        });
    }
}


export const findTaskByTerm = async (req = request, res = response) => {

    const { term } = req.params;
    const regex = new RegExp(term, 'i');

    try {

        let task;

        if (isValidObjectId(term)) {
            task = await Task.findById(term);
        } else {
            task = await Task.find({
                $or: [{ title: regex }, { status: regex }]
            });
        }

        if (task.length === 0)
            return res.status(404).json({
                error: `Task with title, id, or status '${term}' not found`
            });

        return res.json({
            results: task
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Something went broke.'
        });
    }
}

export const updateTask = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, ...rest } = req.body;

    try {

        const task = await Task.findByIdAndUpdate(id, {
            status: status ? status.toUpperCase() : undefined,
            ...rest
        }, { new: true }
        );

        return res.status(200).json({
            task
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went broke.'
        });
    }
}

//TODO: Añadir Ordenamiento
export const findAllPaginated = async (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;

    try {
        const results = await Task.find()
            .skip(offset)
            .limit(+limit)

        return res.status(200).json({
            total: results.length,
            results
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went broke.'
        });
    }
}

export const deleteTask = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        await Task.findByIdAndDelete(id);

        return res.json({
            message: 'Task deleted'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Something went broke'
        });

    }

}