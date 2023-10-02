import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './authentication-middleware';
import { notFoundError, notPaidError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';

export async function userValidate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const enrollmentInfo = await enrollmentRepository.findEnrollmentByUserId(req.userId);
  if (enrollmentInfo == null) throw notFoundError();
  const ticketInfo = await ticketsRepository.findTicketByEnrollmentId(enrollmentInfo.id);
  if (ticketInfo == null) throw notFoundError();
  if (ticketInfo.status == 'RESERVED' || ticketInfo.TicketType.isRemote || !ticketInfo.TicketType.includesHotel)
    throw notPaidError();
  next();
}
