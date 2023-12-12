import mongoose from "mongoose";
import config from "config";
import log from "./logger";

mongoose.connection.on('error', () => {
    log.info("Database connection error")
})


async function connectToDB(){
    const dbUri = config.get<string>("dbUri")
    await mongoose.connect(dbUri)
    log.info("Connected to DB")
}

async function disconnectDB(){
    await mongoose.disconnect()

}

export default {
    connectToDB,
    disconnectDB
}