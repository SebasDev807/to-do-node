import { Router } from "express";
import Task from "../models/task.model.js";
import User from '../models/user.model.js'

const taskSeed = Router();

const tasks = [
    {
        title: "Estudiar Node.js",
        description: "Realizar rutas con express",
        status: "IN PROGRESS",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Estudiar Cálculo Integral",
        description: "Aprender integración por partes",
        status: "PENDING",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Estudiar Node.js",
        description: "Estudiar rutas",
        status: "COMPLETED",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Estudiar Álgebra Lineal",
        description: "Realizar ejercicios",
        status: "PENDING",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Practicar algoritmos",
        description: "Resolver problemas en HackerRank",
        status: "COMPLETED",
        deadLine: new Date("2024-10-12")
    },
    {
        title: "Actualizar CV",
        description: "Añadir nuevos proyectos",
        status: "PENDING",
        deadLine: new Date("2024-12-15")
    },
    {
        title: "Leer libro de JavaScript",
        description: "Completar el libro 'Eloquent JavaScript'",
        status: "PENDING",
        deadLine: new Date("2024-11-30")
    },
    {
        title: "Hacer ejercicio",
        description: "Realizar rutina de ejercicios 3 veces a la semana",
        status: "IN PROGRESS",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Aprender sobre bases de datos",
        description: "Estudiar SQL y NoSQL",
        status: "PENDING",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Desarrollar proyecto personal",
        description: "Crear una aplicación web usando React",
        status: "PENDING",
        deadLine: new Date("2025-01-15")
    },
    {
        title: "Practicar Git",
        description: "Hacer ejercicios de Git y GitHub",
        status: "COMPLETED",
        deadLine: new Date("2024-10-20")
    },
    {
        title: "Estudiar diseño de interfaces",
        description: "Aprender principios de UI/UX",
        status: "PENDING",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Tomar un curso de Python",
        description: "Completar el curso de Python en línea",
        status: "IN PROGRESS",
        deadLine: new Date("2024-11-15")
    },
    {
        title: "Revisar proyectos anteriores",
        description: "Analizar y mejorar proyectos pasados",
        status: "PENDING",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Contribuir a un proyecto open-source",
        description: "Buscar y contribuir a un proyecto en GitHub",
        status: "PENDING",
        deadLine: new Date("2024-12-31")
    },
    {
        title: "Asistir a un meetup de tecnología",
        description: "Conocer a otros desarrolladores y aprender",
        status: "PENDING",
        deadLine: new Date("2024-10-30")
    },
    {
        title: "Estudiar un nuevo framework",
        description: "Aprender sobre un nuevo framework de desarrollo web",
        status: "PENDING",
        deadLine: new Date("2024-11-15")
    },
    {
        title: "Crear un portafolio en línea",
        description: "Diseñar y desarrollar un portafolio para mostrar mis proyectos",
        status: "PENDING",
        deadLine: new Date("2024-11-30")
    },
    {
        title: "Leer un libro de programación",
        description: "Terminar de leer 'Clean Code' de Robert C. Martin",
        status: "PENDING",
        deadLine: new Date("2024-12-15")
    },
    {
        title: "Participar en un hackathon",
        description: "Unirse a un hackathon local y colaborar con otros",
        status: "PENDING",
        deadLine: new Date("2024-11-20")
    },
    {
        title: "Actualizar el CV",
        description: "Revisar y actualizar el currículum vitae",
        status: "PENDING",
        deadLine: new Date("2024-12-01")
    },
    {
        title: "Aprender sobre bases de datos NoSQL",
        description: "Explorar MongoDB y otras bases de datos NoSQL",
        status: "PENDING",
        deadLine: new Date("2024-12-05")
    },
    {
        title: "Tomar un curso de JavaScript avanzado",
        description: "Inscribirse en un curso en línea para mejorar mis habilidades",
        status: "PENDING",
        deadLine: new Date("2024-12-10")
    },
    {
        title: "Conectar con un mentor",
        description: "Buscar y establecer contacto con un mentor en la industria",
        status: "PENDING",
        deadLine: new Date("2024-11-25")
    },
    {
        title: "Implementar un proyecto personal",
        description: "Desarrollar un proyecto personal para aplicar lo aprendido",
        status: "PENDING",
        deadLine: new Date("2024-12-20")
    },
    {
        title: "Revisar y practicar algoritmos",
        description: "Dedicar tiempo a resolver problemas de algoritmos y estructuras de datos",
        status: "PENDING",
        deadLine: new Date("2024-12-30")
    }
];

taskSeed.get('/tasks', async (req, res) => {

    try {

        const users = await User.find();

        //Extraer los ids para asignarselos a cada task
        const ids = users.reduce((acc, user) => {
            acc.push(user._id);
            return acc;
        }, []);

        //Asignar un id aleatorio a cada usuario
        //Simulando que estos crearon dicha tarea
        tasks.forEach(task => {
            const randomIndex = Math.floor(Math.random() * ids.length);
            task.author = ids[randomIndex];
        });


        await Task.deleteMany();
        await Task.insertMany(tasks);

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

export default taskSeed;

