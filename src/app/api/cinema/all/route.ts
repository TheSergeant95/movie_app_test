import { fetchCinemasList } from "@/http/itemAPI";
import { CinemaType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const res = await fetchCinemasList();
    if (res.status !== 200) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }
    const filter = req.nextUrl.searchParams.get('id');
    let data = res.data;
    if (filter) {
        data = data?.filter((cinema: CinemaType) => cinema.id == +filter) || [];
    }
    if (!data || data.length == 0) return NextResponse.json({ message: 'Кинотеатры не найдены' }, { status: 404 });
    return NextResponse.json({ data }, { status: res.status });
}