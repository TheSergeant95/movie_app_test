import { fetchCinemaSessionsList, fetchMoviesList } from "@/http/itemAPI";
import { MovieType, SessionType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
    const cinemaId = (await params).id;
    const res = await fetchCinemaSessionsList(cinemaId);

    if (res.status !== 200) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }

    let now = new Date().getTime();
    let data = res.data?.filter((session) => new Date(session.startTime).getTime() > now) || [];
    if (!data || data.length == 0) return NextResponse.json({ message: 'Киносеансов не найдено' }, { status: 404 });

    data = await populateCinemaData(data);

    return NextResponse.json({ data }, { status: res.status });
}

async function populateCinemaData(sessions: SessionType[]) {
    const moviesRes = await fetchMoviesList();
    if (moviesRes.status == 200) {
        const movies: MovieType[] = moviesRes?.data || [];
        sessions.forEach((session: SessionType) => {
            const movie = movies.find((movie: MovieType) => movie.id == session.movieId)
            if (movie) {
                session.movieName = movie.title;
                session.moviePoster = movie.posterImage;
            }
        });
    }
    return sessions;
}