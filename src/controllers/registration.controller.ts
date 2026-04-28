import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthedRequest extends Request {
  user?: { userId: number };  // ✅ 改这里
}

// =======================
// REGISTER FOR EVENT
// =======================
export const registerForEvent = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;   // ✅ 改这里
    const { eventId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!eventId) return res.status(400).json({ message: "eventId is required" });

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existing = await prisma.registration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registration = await prisma.registration.create({
      data: { userId, eventId },
    });

    return res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// =======================
// CANCEL REGISTRATION
// =======================
export const cancelRegistration = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;  // ✅ 改这里
    const registrationId = Number(req.params.id);

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const registration = await prisma.registration.findFirst({
      where: {
        id: registrationId,
        userId,
      },
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await prisma.registration.delete({
      where: { id: registrationId },
    });

    return res.json({ message: "Registration cancelled" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// =======================
// GET MY REGISTRATIONS
// =======================
export const getMyRegistrations = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;  // ✅ 改这里

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: { event: true },
    });

    return res.json(registrations);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};