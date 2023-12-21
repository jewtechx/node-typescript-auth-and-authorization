import {Request,Response,NextFunction} from "express"

export const requestuser = async (req:Request,res:Response,next:NextFunction) => {

    const user = res.locals.user 

    if(!user){
        return res.status(403)
    }

    return next()
}
