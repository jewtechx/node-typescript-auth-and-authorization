import express from "express"
import validateResource from "../middleware/validateResource"
import { createUserShema } from "../schemas/user.schema"

const router = express.Router()

router.post("/api/users" , validateResource(createUserShema), (req,res) => res.sendStatus(200))

export default router