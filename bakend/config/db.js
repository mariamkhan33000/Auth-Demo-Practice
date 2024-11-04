import mongoose from "mongoose";
import Color from "color";
import colors from "colors";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_MONGOOSE)
        console.log(`Mongodb is conneceted at the: ${mongoose.connection.host}`.bgCyan)
    } catch (error) {
        console.log(`Error connection on mongodb ${error.message}`.bgBlue)
    }
}