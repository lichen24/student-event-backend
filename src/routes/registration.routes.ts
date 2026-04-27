import { Router } from "express";
import {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations
} from "../controllers/registration.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, registerForEvent);
router.delete("/:id", authMiddleware, cancelRegistration);
router.get("/me", authMiddleware, getMyRegistrations);

export default router;
