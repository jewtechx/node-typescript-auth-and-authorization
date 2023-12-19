import { Request,Response } from "express";
import { createUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import sendEmail from "../utils/mailer";

export async function createUserHandler(req:Request<{}, {},createUserInput> ,res:Response){

    const body = req.body
    try{
        const user = await createUser(body)

       await sendEmail({
        from:"test@example.com",
        to:user.email,
        subject:"Please verify your account",
        text:`Verification code : ${user.verificationCode}. Id : ${user._id}`,
       })

        return res.status(200).send("User created successfully")
    }catch(e:any){
        if(e.code === 11000){
            return res.status(409).send("Account already exists")
        }

        return res.status(500).send(e)
    }
}