import { render, screen } from '@testing-library/react';
import BookingsListItem from '@/components/BookingsListItem';
import { BookingType } from '@/types';
import { UUID } from 'crypto';

describe('BookingsListItem', () => {
    const mockBooking = {
        id: crypto.randomUUID() as UUID,
        movieName: 'Movie 1',
        cinemaName: 'Cinema 1',
        startTime: new Date('2025-11-21T18:00:00Z'),
        isPaid: true,
        movieSessionId: 1,
        bookedAt: new Date('2025-11-11T18:00:00Z'),
        userId: 1,
        cinemaId: 1,
        movieId: 1,
        seats: [
            {
                rowNumber: 1,
                seatNumber: 1,
            },
            {
                rowNumber: 2,
                seatNumber: 2,
            },
        ]
    };

    it('рендерится информация о бронировании', () => {
        render(<BookingsListItem booking={mockBooking} />);
        expect(screen.getByText("Movie 1")).toBeInTheDocument();
        expect(screen.getByText("Cinema 1")).toBeInTheDocument();
    });
});
