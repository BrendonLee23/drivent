import { notFoundError } from '@/errors';
import { hotelsRepository } from '@/repositories/hotels-repository';

async function getHotels() {
  const allHotels = await hotelsRepository.getHotels();
  if (allHotels.length == 0) throw notFoundError();
  return allHotels;
}

export const hotelsService = {
  getHotels,
};
