import { Router } from 'express';
import { getTicket, getTicketTypes, postTicket } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.get('/tickets/types', authenticateToken, getTicketTypes);
ticketsRouter.get('/tickets', authenticateToken, getTicket);
ticketsRouter.post('/tickets', authenticateToken, postTicket);

export { ticketsRouter };
