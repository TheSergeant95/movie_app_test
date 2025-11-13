import { fetchCinemasList, fetchMovieSession, fetchMoviesList } from "@/http/itemAPI";
import { CinemaType, MovieType, SessionType } from "@/types";
import { HTTP_STATUS } from "@/utils/constaints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ sessionId: number }> }) {
    const sessionId = (await params).sessionId;
    const res = await fetchMovieSession(sessionId);
    if (res.status !== HTTP_STATUS.OK) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }
    let data = res?.data || null;
    if (!data) return NextResponse.json({ message: 'Киносеанс не найден' }, { status: HTTP_STATUS.NOT_FOUND });

    data = await populateMovieData(data);

    data = await populateCinemaData(data);

    return NextResponse.json({ data }, { status: res.status });
}

async function populateMovieData(data: SessionType) {
    const moviesRes = await fetchMoviesList();
    if (moviesRes.status == HTTP_STATUS.OK) {
        const movies: MovieType[] = moviesRes?.data || [];
        const movie = movies.find((movie: MovieType) => movie.id == data.movieId)
        if (movie) {
            data.movieName = movie.title;
        }
    }
    return data;
}

async function populateCinemaData(data: SessionType) {
    const cinemasRes = await fetchCinemasList();
    if (cinemasRes.status == HTTP_STATUS.OK) {
        const cinemas: CinemaType[] = cinemasRes?.data || [];
        const cinema = cinemas.find((cinema: CinemaType) => cinema.id == data.cinemaId)
        if (cinema) data.cinemaName = cinema.name;
    }
    return data;
}