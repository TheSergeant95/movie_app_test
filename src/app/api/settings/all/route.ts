import { fetchAppSettings } from "@/http/itemAPI";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetchAppSettings();
    if (res.status !== 200) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }
    let data = res.data;

    if (!data) return NextResponse.json({ message: 'Настройки не найдены' }, { status: 404 });

    return NextResponse.json({ data }, { status: res.status });
}