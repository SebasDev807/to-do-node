import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Db connection successfully')
    } catch (error) {
        console.error(error);
    }
}

export default dbConnect;