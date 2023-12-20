import { Request,Response } from "express";
import { createUserInput,verifyUserInput,forgotPasswordInput } from "../schemas/user.schema";
import { createUser,findUserById,findUserByEmail } from "../services/user.service";
import sendEmail from "../utils/mailer";

export async function createUserHandler(req:Request<{}, {},createUserInput> ,res:Response){

    const body = req.body;
    try{
        const user = await createUser(body);

       await sendEmail({
        from:"test@example.com",
        to:user.email,
        subject:"Please verify your account",
        text:`Verification code : ${user.verificationCode}. Id : ${user._id}`,
       });

        return res.status(200).send("User created successfully");
    }catch(e:any){
        if(e.code === 11000){
            return res.status(409).send("Account already exists");
        }

        return res.status(500).send(e);
    }
}

export async function verifyUserHandler(req:Request<{}, {}, verifyuserInput> , res:Response){
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    // find the user by Id
    const user = await findUserById(id);

    if(!user){
        return res.send("Couldn't verify user");
    }

    // check to see if they are already verified
    if(user.verified){
        return res.send("User is already verified");
    }

    // check to see if verificationCode matches
    if(user.verificationCode === verificationCode){
        user.verified = true;

        await user.save();

        return res.send("User successfully verified");
    }
}

export async function forgotPasswordHandler(req:Request<forgotPasswordInput>,res:Response){
    const message = "If a user with that email is registered you will receive a password reset email";

    const {email} = req.body;

    const user = await findUserByEmail(email);

    if(!user){
        log.debug(`User with email ${email} does not exist`);
        return res.send(message);
    }

    if(!user.verified){
        return res.send("User is not verified");
    }

    const passwordResetCode = uuid.v4()

    user.passwordResetCode = passwordResetCode

    await user.save()

    await sendEmail({
        to:user.email,
        from:"test@example.com",
        subject:"Reset your password",
        text:`Password reset code: ${passwordResetCode}. Id: ${user._id}`
    })

    log.debug(`Password reset code sent to ${user.email}`)

    return res.send(message)
}