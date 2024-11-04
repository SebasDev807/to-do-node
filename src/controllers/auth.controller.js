import { request, response } from "express";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateJwt } from "../helpers/generate-jwt.js";


//Funcion que controla el inicio de sesion
export const login = async (req = request, res = response) => {

    const { password, email } = req.body;

    try {

        //Se busca el usuario por el email ingresado
        const user = await User.findOne({ email });

        //Se verifica si el usuario esta activo y esta confirmado
        if (!user.status || !user.confirmed) {
            return res.status(404).json({
                error: `User with email ${email} doesn't exists `
            });
        }

        //Se compara la contraseña ingresada con la contraseña encriptada del usuario en la base de datos
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                error: 'Check your password'
            });

        }

        //Se genera un json web token que guarda la información del usuario en una cadena cifrada, 
        //tiene fecha de expiracion y sirve para autenticar al usuario
        const jwt = await generateJwt(user._id);

        //Si el usuario existe y todo sale bien se retorna an la respuesta al cliente el usuario
        //y sl json web token generado
        return res.status(200).json({
            user,
            jwt
        })


    } catch (error) {
        //En caso de un error en el lado del servidor(este codigo presente)
        //Se devuelve un codigo de estado 500 que informa que algo salio mal interna-
        //mente
        console.error(error);
        res.status(500).json({
            error: 'Something went breoke.'
        });
    }

    //Codigos de estado 400 - 499 :Error del lado del navegador, 500-599: error del lado del servidor
    //200-299: Codigos de exito, 300-399: redireccion, 100-199: no se pa que se usan estos :/
}