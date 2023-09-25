import { ticketsRepository } from "@/repositories/tickets-repository";

export type ReturnTicket = {
  id: number;
  status: string; //RESERVED | PAID
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

export const ticketService = {
  getTicketTypes,
};
