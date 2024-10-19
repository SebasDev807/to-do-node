import { request, response } from "express";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateJwt } from "../helpers/generate-jwt.js";

export const login = async (req = request, res = response) => {

    const { password, email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user.status || !user.confirmed) {
            return res.status(401).json({
                error: `User with email ${email} doesn't exists `
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                error: 'Check your password'
            });

        }

        const jwt = await generateJwt(user._id);

        return res.status(200).json({
            user,
            jwt
        })


    } catch (error) {

        console.error(error);
        res.status(500).json({
            error: 'Something went breoke.'
        });
    }

}