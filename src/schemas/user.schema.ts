import {object,string,TypeOf} from "zod"

export const createUserShema = object({
    body:object({
        firstName:string({
            required_error:"FirstName is required"
        }),
        lastName:string({
            required_error:"LastName is required"
        }),
        password:string({
            required_error:"Password is required"
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation:string({
            required_error:"Password Confirmation is required"
        }),
        email:string({
            required_error:"Email is required"
        }).email("Not a valid email"),
    }).refine((data) => data.password == data.passwordConfirmation, {
        message:"Passwords do not match",
        path:["passwordConfirmation"]
    })
})

export const verifyUserShema = object({
    params:object({
        id:string(),
        verificationCode:string()
    })
})

export const forgotPasswordSchema = object({
    body:object({
        email:string({
            required_error:"Email is required"
        }).email("Not a valid email")
    })
})

export type createUserInput = TypeOf<typeof createUserShema> ["body"]
export type verifyUserInput = TypeOf<typeof verifyUserShema> ["params"]
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema> ["body"]
