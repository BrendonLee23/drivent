import { notFoundError } from '@/errors';
import { bookingsRepository } from '@/repositories';
import { bookingsService } from '@/services';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getBooking test', () => {
  it('should return notFoundError when there is no booking', async () => {
    jest.spyOn(bookingsRepository, 'getBooking').mockResolvedValue(null);

    const promise = bookingsService.getBooking(1);

    expect(promise).rejects.toEqual(notFoundError());
  });

  it('should return the user booking', async () => {
    jest.spyOn(bookingsRepository, 'getBooking').mockImplementationOnce((): any => {
      return {
        id: 2,
        Room: {
          id: 15,
          name: 'Quarto 01',
          capacity: 2,
          hotelId: 3,
          createdAt: '2023-10-05T11:30:12.167Z',
          updatedAt: '2023-10-05T11:30:12.167Z',
        },
      };
    });

    const booking = await bookingsService.getBooking(1);

    expect(booking).toEqual({
      id: 2,
      Room: {
        id: 15,
        name: 'Quarto 01',
        capacity: 2,
        hotelId: 3,
        createdAt: '2023-10-05T11:30:12.167Z',
        updatedAt: '2023-10-05T11:30:12.167Z',
      },
    });
  });
});
