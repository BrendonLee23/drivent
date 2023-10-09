import { Router } from 'express';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { editBooking, getBooking, postBooking } from '@/controllers';
import { bookingIdSchema, bookingSchema } from '@/schemas/booking-schema';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingSchema), postBooking)
  .put('/:bookingId', validateBody(bookingSchema), validateParams(bookingIdSchema), editBooking);

export { bookingRouter };
