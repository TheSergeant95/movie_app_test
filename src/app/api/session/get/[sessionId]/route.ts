import { fetchCinemasList, fetchMovieSession, fetchMoviesList } from "@/http/itemAPI";
import { CinemaType, MovieType, SessionType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ sessionId: number }> }) {
    const sessionId = (await params).sessionId;
    const res = await fetchMovieSession(sessionId);
    if (res.status !== 200) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }
    let data = res?.data || null;
    if (!data) return NextResponse.json({ message: 'Киносеанс не найден' }, { status: 404 });

    data = await populateMovieData(data);

    data = await populateCinemaData(data);

    return NextResponse.json({ data }, { status: res.status });
}

async function populateMovieData (data: SessionType) {
    const moviesRes = await fetchMoviesList();
    if (moviesRes.status == 200) {
        const movies: MovieType[] = moviesRes?.data || [];
        const movie = movies.find((movie: MovieType) => movie.id == data.movieId)
        if (movie) {
            data.movieName = movie.title;
        }
    }
    return data;
}

async function populateCinemaData (data: SessionType) {
    const cinemasRes = await fetchCinemasList();
    if (cinemasRes.status == 200) {
        const cinemas: CinemaType[] = cinemasRes?.data || [];
        const cinema = cinemas.find((cinema: CinemaType) => cinema.id == data.cinemaId)
        if (cinema) data.cinemaName = cinema.name;
    }
    return data;
}