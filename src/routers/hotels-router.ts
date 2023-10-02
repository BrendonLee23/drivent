import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels } from '@/controllers';
import { userValidate } from '@/middlewares/user-validate-middleware';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken, userValidate).get('/', getHotels);

export { hotelsRouter };
