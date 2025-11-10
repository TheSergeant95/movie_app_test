import { fetchCinemasList, fetchMovieSession, fetchMoviesList, fetchUserBookings } from "@/http/itemAPI";
import { BookingType, CinemaType, MovieType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const res = await fetchUserBookings(req);

    if (res.status !== 200) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }
    let data = res?.data?.filter((booking: BookingType) => !!booking.movieSessionId) || [];
    if (!data || data.length == 0) return NextResponse.json({ message: 'No bookings found' }, { status: 404 });

    data = await populateIDs(data);
    data = await populateCinemaData(data);
    data = await populateMovieData(data);

    return NextResponse.json({ data }, { status: res.status });
}

async function populateIDs(data: BookingType[]) {
    for (const booking of data) {
        const sessionRes = await fetchMovieSession(booking.movieSessionId);
        if (sessionRes.status == 200) {
            const session = sessionRes.data;
            if (session) {
                booking.movieId = session.movieId;
                booking.cinemaId = session.cinemaId;
                booking.startTime = session.startTime;
            }
        }
    }
    return data;
}

async function populateCinemaData(data: BookingType[]) {
    const moviesRes = await fetchMoviesList();
    if (moviesRes.status == 200) {
        const movies: MovieType[] = moviesRes?.data || [];
        data.forEach((booking: BookingType) => {
            if (!booking.movieId) return;
            const movie = movies.find((movie: MovieType) => movie.id == booking?.movieId)
            if (movie) booking.movieName = movie.title;
        })
    }
    return data;
}

async function populateMovieData(data: BookingType[]) {
    const cinemasRes = await fetchCinemasList();
    if (cinemasRes.status == 200) {
        const cinemas: CinemaType[] = cinemasRes?.data || [];
        data.forEach((booking: BookingType) => {
            if (!booking.cinemaId) return;
            const cinema = cinemas.find((cinema: CinemaType) => cinema.id == booking?.cinemaId)
            if (cinema) booking.cinemaName = cinema.name;
        })
    }
    return data;
}