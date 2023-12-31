import express from "express"
import validateResource from "../middleware/validateResource"
import { createUserShema,verifyUserSchema,forgotPasswordSchema,resetPasswordSchema } from "../schemas/user.schema"
import { createUserHandler,verifyUserHandler,forgotPasswordHandler,resetPasswordHandler, getCurrentUserHandler } from "../controllers/user.controller"
import { requestuser } from "../middleware/requireuser"

const router = express.Router()

router.post("/api/users" , validateResource(createUserShema),createUserHandler)
router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema),verifyUserHandler)
router.post("/api/users/forgotpassword", validateResource(forgotPasswordSchema),forgotPasswordHandler)
router.post("/api/users/resetpassword", validateResource(resetPasswordSchema), resetPasswordHandler )
router.get("/api/users/me", requestuser, getCurrentUserHandler)

export default router