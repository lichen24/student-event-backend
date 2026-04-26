import { Request, Response } from "express";
import { EventService } from "../services/event.service";

const eventService = new EventService();

export class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      const { name, date, location, description } = req.body;

      const event = await eventService.createEvent({
        name,
        date: new Date(date),
        location,
        description,
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  }

  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const event = await eventService.getEventById(id);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const updated = await eventService.updateEvent(id, data);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update event" });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await eventService.deleteEvent(id);
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  }
}