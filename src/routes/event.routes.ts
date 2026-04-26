import { Router } from "express";
import { EventController } from "../controllers/event.controller";

const router = Router();
const controller = new EventController();

router.post("/", controller.createEvent);
router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

export default router;