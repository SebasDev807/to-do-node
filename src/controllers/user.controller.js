import { request, response, } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import { generateToken } from "../helpers/generate-token.js";

export const createAccount = async (req = request, res = response) => {

    const { username, email, password, status, confirmed, token, ...rest } = req.body;

    try {

        const existUser = await User.findOne({
            $or: [{ email, username }]
        });

        console.log(existUser);

        if (existUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const user = await User.create({
            email,
            username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            token: generateToken(),
            ...rest
        });

        return res.status(201).json({ user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Something went broke'
        });
    }
}


export const confirmAccount = async (req = request, res = response) => {

    const { token } = req.params;

    try {

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({
                error: 'Invalid token or has expired'
            });
        }

        user.token = null;
        user.confirmed = true;
        user.status = true;

        await user.save();

        return res.status(200).json({
            message: 'Account confirmed'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Something went broke'
        });

    }
}


export const desactiveUser = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const user = await User.findById(id);

        if (!user || !user.status) {
            return res.status(404).json({
                error: `User with id ${id} not found.`
            });
        }

        user.status = false;

        await user.save();

        return res.status(200).json({
            ok: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Something went broke.'
        });

    }
}