import { Router } from 'express';
import { getTicket, getTicketTypes, postTicket } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketTypes);
ticketsRouter.get('/', authenticateToken, getTicket);
ticketsRouter.post('/', authenticateToken, postTicket);

export { ticketsRouter };
