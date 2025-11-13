import { setMovieSessionAsBooked } from "@/http/itemAPI";
import { SeatPositionType } from "@/types";
import { HTTP_STATUS } from "@/utils/constaints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ sessionId: number }> }) {
    const sessionId = (await params).sessionId;
    const body = await req.json();
    const seats: SeatPositionType[] = body.seats;

    const res = await setMovieSessionAsBooked(sessionId, seats);

    if (res.status !== HTTP_STATUS.OK) {
        return NextResponse.json({ message: res.status === HTTP_STATUS.UNAUTHORIZED ? 'Вы не авторизованы' : res.message }, { status: res.status });
    }
    const data = res.data;

    return NextResponse.json({ data }, { status: res.status });
}