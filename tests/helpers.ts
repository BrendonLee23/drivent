import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
<<<<<<< HEAD

=======
>>>>>>> ccb830af41f1e46b91cbca8bba2655415a1ac3b1
import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.address.deleteMany({});
<<<<<<< HEAD
=======
  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.ticketType.deleteMany({});
>>>>>>> ccb830af41f1e46b91cbca8bba2655415a1ac3b1
  await prisma.enrollment.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
<<<<<<< HEAD
=======
  await prisma.user.deleteMany({});
>>>>>>> ccb830af41f1e46b91cbca8bba2655415a1ac3b1
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
