import nodemailer, { SendMailOptions } from "nodemailer"
import log from "./logger"
import config from "config"
// async function createTestCreds(){
//     const creds = await nodemailer.createTestAccount()
// }

// createTestCreds()

const smtp = config.get<{
    user:string,
    pass:string,
    host:string,
    port:string,
    secure:boolean
}>("smtp")

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass },
  });

async function sendEmail(payload:SendMailOptions){
    transporter.sendMail(payload, (err,info) => {
        if(err){
            log.error(err,"Error sending mail")
        }

        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    })
}

export default sendEmail