import express from "express"
import { registerForEvent } from "../controllers/registration.controller"
import { authMiddleware } from "../middleware/auth"

const router = express.Router()

router.post("/", authMiddleware, registerForEvent)

export default router
