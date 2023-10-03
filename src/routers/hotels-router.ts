import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelById, getHotels } from '@/controllers';
import { userValidate } from '@/middlewares/user-validate-middleware';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken, userValidate).get('/', getHotels).get('/:hotelId', getHotelById);

export { hotelsRouter };
