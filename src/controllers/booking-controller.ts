import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingsService } from '@/services';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bookingResult = await bookingsService.getBooking(userId);
  res.status(httpStatus.OK).send(bookingResult);
}
export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const result = await bookingsService.postBooking(userId, roomId);
  res.status(httpStatus.OK).send(result);
}
export async function editBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;
  const update = await bookingsService.putBooking(userId, roomId, Number(bookingId));
  res.status(httpStatus.OK).send(update);
}
