import { UUID } from "crypto"

export type UserCredentialsType = {
    username: string,
    password: string
}

export type SeatPositionType = {
    rowNumber: number,
    seatNumber: number
}

export type MovieType = {
    id: number,
    title: string,
    year: number,
    rating: number,
    posterImage: string,
    lengthMinutes: number,
    description: string
}

export type CinemaType = {
    id: number;
    name: string;
    address: string;
}

export type SessionType = {
    id: number;
    movieId: number;
    moviePoster?: string;
    movieName?: string;
    cinemaId: number;
    cinemaName?: string;
    startTime: Date;
    seats: AvailableSeats;
    bookedSeats: SeatPositionType[];
}

export type AvailableSeats = {
    rows: number;
    seatsPerRow: number;
}

export type GeneratedMovieSessionsType = {
    [date: string]: {
        [cinema: string]: GeneratedMovieDataType | GeneratedCinemaDataType
    }
}

export type GeneratedMovieDataType = {
    [time: string]: string,
    moviePoster: string,
}

export type GeneratedCinemaDataType = {
    [time: string]: string
}

export type BookingType = {
    id: UUID;
    movieSessionId: number;
    userId: number;
    cinemaId?: number;
    startTime?: Date;
    movieId?: number;
    cinemaName?: string;
    movieName?: string;
    isPaid: boolean;
    seats: SeatPositionType[];
    bookedAt: Date;
}

export type ItemAPIResponseType<T> = {
    status: number;
    data?: T;
    message?: string;
}