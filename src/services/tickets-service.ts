import { notFoundError } from '@/errors';
import { enrollmentRepository } from '@/repositories';
import { ticketsRepository } from '@/repositories/tickets-repository';
import { TicketTypeID } from '@/schemas';

type ReturnTicket = {
  id: number;
  status: string;
  ticketTypeId: number;
  enrollmentId: number;
  TicketType: {
    id: number;
    name: string;
    price: number;
    isRemote: boolean;
    includesHotel: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

async function getTicketTypes() {
  const types = await ticketsRepository.getTicketTypes();
  return types;
}

async function getTicket(ownerId: number): Promise<ReturnTicket | null> {
  const ticket = await ticketsRepository.getTicket(ownerId);
  if (!ticket) throw notFoundError('Ticket not found');
  return ticket;
}

async function postTicket(id: TicketTypeID, userId: number): Promise<ReturnTicket> {
  const tickedTypeId = id.ticketTypeId;
  const enrollmentExist = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentExist) {
    throw notFoundError('Enrollment not found');
  }

  const result = ticketsRepository.createTicket(tickedTypeId, enrollmentExist.id);
  return result;
}

export const ticketService = {
  getTicketTypes,
  getTicket,
  postTicket,
};
export { ReturnTicket };
