import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './src/config/db.config.js';
import taskSeed from './src/seed/task.seed.js';
import taskRouter from './src/routes/task.routes.js';
dotenv.config();

await dbConnect();
const app = express();
const port = process.env.PORT;

//Middlewares
app.use(express.json());


//Routes
app.use('/api/v1/tasks', taskRouter);


//Seed
app.use('/api/v1/seed', taskSeed);





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})