import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

//middleware para validar JWT
export const validateJWT = async (req, res, next) => {

    const token = req.header('to-do-token');

    if (!token) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    try {

        //Extraer el payload del token
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        //leer el usuario correspondiente al uid
        const user = await User.findById(uid);
    
        //Verificar si el usuario existe
        if(!user || !user.status){
            return res.status(404).json({
                error:`User with id ${uid} doesn't exists`
            });
        }

        // ???
        req.user = user;

        next();

    

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went broke.'
        })

    }

}