import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser, createEnrollmentWithAddress, createTicketType, createTicket, createPayment } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('when token is valid', () => {
  it('should respond with status 400 when there is no body', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType(false, false);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);

    const response = await server.post('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is invalid', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType(false, false);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);

    const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({ room: 2 });

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });
});
