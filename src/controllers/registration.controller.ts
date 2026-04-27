import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id
    const { eventId } = req.body

    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) }
    })

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    const existing = await prisma.registration.findFirst({
      where: {
        userId,
        eventId: Number(eventId)
      }
    })

    if (existing) {
      return res.status(409).json({ message: "Already registered" })
    }

    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId: Number(eventId)
      }
    })

    res.status(201).json({
      message: "Registered successfully",
      registration
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
