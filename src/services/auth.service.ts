import { DocumentType } from "@typegoose/typegoose";
import { User, privateField } from "../model/user.model";
import { signJwt } from "../utils/jwt";
import SessionModel from "../model/session.model";
import { omit } from "lodash";


const createSession = function({userId}:{userId:string}){
    return SessionModel.create({user:userId})
}

export async function signRefreshToken({userId}:{userId:string}){
    const session = await createSession({userId})

    const refreshToken = signJwt({session:session._id}, "refreshTokenPrivateKey", {
        expiresIn:"1y"
    });

    return refreshToken
}

export function signAccessToken(user:DocumentType<User>){
    const payload = omit(user.toJSON(), privateField)

    const accessToken = signJwt(payload,"accessTokenPrivateKey",{
        expiresIn:"15m"
    })

    return accessToken
}

export async function findSessionById(id:string){
    return SessionModel.findById(id)
}