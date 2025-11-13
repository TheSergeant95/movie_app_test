import { fetchCinemasList, fetchMovieSessionsList } from "@/http/itemAPI";
import { CinemaType, SessionType } from "@/types";
import { HTTP_STATUS } from "@/utils/constaints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
    const cinemaId = (await params).id;
    const res = await fetchMovieSessionsList(cinemaId);

    if (res.status !== HTTP_STATUS.OK) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }

    let now = new Date().getTime();
    let data = res.data?.filter((session) => new Date(session.startTime).getTime() > now) || [];
    if (!data || data.length == 0) return NextResponse.json({ message: 'Киносеансов не найдено' }, { status: HTTP_STATUS.NOT_FOUND });

    data = await populateCinemaData(data);

    return NextResponse.json({ data }, { status: res.status });
}

async function populateCinemaData(sessions: SessionType[]) {
    const cinemasRes = await fetchCinemasList();
    if (cinemasRes.status == HTTP_STATUS.OK) {
        const cinemas: CinemaType[] = cinemasRes?.data || [];
        sessions.forEach((session: SessionType) => {
            const cinema = cinemas.find((cinema: CinemaType) => cinema.id == session.cinemaId)
            if (cinema) session.cinemaName = cinema.name;
        });
    }
    return sessions;
}