import { prisma, TicketStatus } from '@prisma/client';
import { ReturnTicket } from '@/services';

async function getTicket(userId: number): Promise<ReturnTicket | null> {
  const ticket = await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
  return ticket as ReturnTicket;
}

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

async function createTicket(ticketId: number, enrollmentId: number): Promise<ReturnTicket> {
  const ticket = await prisma.ticket.create({
    data: {
      enrollmentId: enrollmentId,
      ticketTypeId: ticketId,
      status: TicketStatus.RESERVED,
    },
  });
  const tickType = await prisma.ticketType.findFirst({
    where: {
      id: ticketId,
    },
  });

  const result: ReturnTicket = {
    id: ticket.id,
    status: ticket.status.toString(),
    ticketTypeId: ticket.ticketTypeId,
    enrollmentId: ticket.enrollmentId,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    TicketType: tickType,
  };

  return result;
}

export const ticketsRepository = {
  createTicket,
  getTicket,
  getTicketTypes,
};
