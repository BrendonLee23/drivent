import { Router } from 'express';
import { getTicket, getTicketTypes } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.get('/tickets/types', authenticateToken, getTicketTypes);
ticketsRouter.get('/tickets', authenticateToken, getTicket);

export { ticketsRouter };
