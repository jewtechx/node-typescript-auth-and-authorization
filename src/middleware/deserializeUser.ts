import {Request,Response,NextFunction} from "express"
import { verifyJwt } from "../utils/jwt"

export const deserializeuser = async (req:Request,res:Response,next:NextFunction) => {
    const accessToken = (req.headers.authorization || " ").replace(/^Bearer\s/, "")

    if(!accessToken) return next()

    const decoded = verifyJwt(accessToken,"accessTokenPublicKey")

    if(decoded){
        res.locals.user = decoded
    }
}
