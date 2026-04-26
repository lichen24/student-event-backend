import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class EventService {
  async createEvent(data: {
    name: string;
    date: Date;
    location: string;
    description?: string;
  }) {
    return prisma.event.create({ data });
  }

  async getAllEvents() {
    return prisma.event.findMany({ orderBy: { date: "asc" } });
  }

  async getEventById(id: number) {
    return prisma.event.findUnique({ where: { id } });
  }

  async updateEvent(id: number, data: any) {
    return prisma.event.update({ where: { id }, data });
  }

  async deleteEvent(id: number) {
    return prisma.event.delete({ where: { id } });
  }
}