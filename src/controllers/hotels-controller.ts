import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { hotelsService } from '@/services/hotels-service';

export async function getHotels(req: Request, res: Response) {
  const allHotels = await hotelsService.getHotels();
  res.status(httpStatus.OK).send(allHotels);
}
