import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser } from '../factories';
import { createBooking } from '../factories/booking-factory';
import { createHotel, createRoomWithHotelId } from '../factories/hotels-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /booking', () => {
  it('should respond with status 401 if no token is given', async () => {
    const result = await server.get('/booking');

    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const newToken = faker.lorem.word();

    const response = await server.get('/booking').set('Authorization', `Bearer ${newToken}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const loggedOutUser = await createUser();
    const newToken = jwt.sign({ userId: loggedOutUser.id }, process.env.JWT_SECRET);

    const result = await server.get('/booking').set('Authorization', `Bearer ${newToken}`);

    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when user has no booking', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const result = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(result.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 when user has a booking', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const createdHotel = await createHotel();
      const createdRoom = await createRoomWithHotelId(createdHotel.id);
      const createdBooking = await createBooking(user.id, createdRoom.id);
      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: createdBooking.id,
        Room: {
          id: createdRoom.id,
          name: expect.any(String),
          capacity: expect.any(Number),
          hotelId: createdHotel.id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });
  });
});
