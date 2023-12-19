require("dotenv").config()
import express from "express"
import config from "config"
import connection from "./utils/connection"
import log from "./utils/logger"
import router from "./routes"

const app = express()

app.use(express.json())

app.use(router)

const port = config.get("port")

app.listen(port, () => {
    log.info(`App started on port ${port}`)
    connection.connectToDB()
})