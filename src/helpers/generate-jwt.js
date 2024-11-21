import jwt from 'jsonwebtoken';

export const generateJwt = async (uid) => {
    try {
        return await jwt.sign(
            { uid },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );
    } catch (error) {
        console.error(error)
    }
}