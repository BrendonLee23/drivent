import faker from '@faker-js/faker';
import { Room } from '@prisma/client';
import { prisma } from '@/config';

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1020',
      capacity: 3,
      hotelId: hotelId,
    },
  });
}

export async function createFullRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1020',
      capacity: 0,
      hotelId: hotelId,
    },
  });
}

export async function createRoom(hotelId: number, params: Partial<Room> = {}) {
  const capacity = params.capacity >= 0 ? params.capacity : faker.datatype.number({ max: 200 });

  return await prisma.room.create({
    data: {
      name: params.name || faker.company.companySuffix(),
      capacity,
      hotelId,
    },
  });
}
