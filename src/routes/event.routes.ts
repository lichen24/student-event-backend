import { Router } from "express";
import { EventController } from "../controllers/event.controller.js";

const router = Router();
const controller = new EventController();

router.post("/", controller.createEvent.bind(controller));
router.get("/", controller.getAllEvents.bind(controller));
router.get("/:id", controller.getEventById.bind(controller));
router.put("/:id", controller.updateEvent.bind(controller));
router.delete("/:id", controller.deleteEvent.bind(controller));

export default router;