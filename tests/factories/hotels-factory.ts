import { faker } from '@faker-js/faker';
import { prisma } from '@/config';

export async function generateHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function generateRoom(hotelId: number, i: number) {
  return await prisma.room.create({
    data: {
      name: `Room ${i}`,
      capacity: Number(faker.random.numeric()),
      hotelId,
    },
  });
}
