import { fetchMoviesList } from "@/http/itemAPI";
import { MovieType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const res = await fetchMoviesList();
    if (res.status !== 200) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }

    let data = res.data;

    const filter = req.nextUrl.searchParams.get('id');
    if (filter) {
        data = data?.filter((movie: MovieType) => movie.id == +filter) || [];
    }

    if (!data || data.length == 0) return NextResponse.json({ message: 'Фильмы не найдены' }, { status: 404 });

    return NextResponse.json({ data }, { status: res.status });
}