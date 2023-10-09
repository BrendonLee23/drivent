import { notFoundError } from '@/errors';
import { bookingsRepository } from '@/repositories';

async function getBooking(userId: number) {
  const bookingRes = await bookingsRepository.getBooking(userId);
  if (!bookingRes) throw notFoundError();
  return bookingRes;
}

export const bookingsService = {
  getBooking,
};
