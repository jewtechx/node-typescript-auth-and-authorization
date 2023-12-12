import dayjs from "dayjs";
import config from "config"
import logger from "pino";

const level = config.get<string>("level")

const log = logger({
    transport:{
        target:"pino-pretty"
    },
    level,
    base:{
        pid:false
    },
    timestamp: () => `,"Time:" "${dayjs().format()}"`
})

export default log