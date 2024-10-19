import jwt from 'jsonwebtoken';

export const generateJwt = async (uid) => {
    try {
        return await jwt.sign({ uid }, process.env.JWT_SECRET);
    } catch (error) {
        console.error(error)
    }
}