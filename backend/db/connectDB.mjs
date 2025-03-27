import mongoose from "mongoose"

export const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log('Connected to MongoDB')

    } catch (error) {

        console.log('Error Connecting MongoDB');

        process.exit(1) // 1 is Failure 0 is Success

    }

}