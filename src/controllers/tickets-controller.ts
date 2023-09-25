import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketService } from '@/services';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response): Promise<TicketTypes> {
  const ticketTypes = await ticketService.getTicketTypes();
  return res.status(httpStatus.OK).send(ticketTypes);
}
