import { prisma } from '@/config';

async function getHotels() {
  return await prisma.hotel.findMany();
}

export const hotelsRepository = {
  getHotels,
};
