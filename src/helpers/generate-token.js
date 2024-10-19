export const generateToken = () => {
    
    const token = Math
    .random()
    .toString(32)
    .substring(2) + Date.now()
    .toString(32);

    return token;
}