import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBooking).post('/',postBooking).put('/:bookingId', editBooking);

export { bookingRouter };
