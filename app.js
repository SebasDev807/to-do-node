import { taskRouter, userRouter, authRouter } from './src/routes/index.js'
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './src/config/db.config.js';
import taskSeed from './src/seed/task.seed.js';

dotenv.config();

await dbConnect();
const app = express();
const port = process.env.PORT;

//Middlewares
app.use(express.json());


//Routes
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);


//Seed
app.use('/api/v1/seed', taskSeed);





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})