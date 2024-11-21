import Users from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { Router } from 'express';

const users = [
    {
        username: "Juan",
        email: "juan.dev@example.com",
        password: "Ju4nPassword!",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "Ana",
        email: "ana.dev@example.com",
        password: "An@Password123",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "Luis",
        email: "luis.dev@example.com",
        password: "Lu1sPassword#",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "María",
        email: "maria.dev@example.com",
        password: "M@riaPassword456",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "Carlos",
        email: "carlos.dev@example.com",
        password: "C@rlosPassword789",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "Lucía",
        email: "lucia.dev@example.com",
        password: "Luc1aPassword%",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "David",
        email: "david.dev@example.com",
        password: "D@vidPassword123",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "Paola",
        email: "paola.dev@example.com",
        password: "P@olaPassword456",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "Fernando",
        email: "fernando.dev@example.com",
        password: "F3rnandoPassword!",
        token: null,
        confirmed: "true",
        status: "true"
    },
    {
        username: "Sofía",
        email: "sofia.dev@example.com",
        password: "S0fiaPassword#",
        token: null,
        confirmed: "true",
        status: "true"
    }
];


const usersSeed = Router();

usersSeed.get('/users', async (req, res) => {

    try {

        users.forEach((user, uid) => {

            const { password } = user;
            // user._id = uids[uid];
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        });


        await Users.deleteMany();
        await Users.insertMany(users);

        res.status(201).json({
            message: 'Seed executed'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Something went broke.'
        });

    }
});

export default usersSeed;