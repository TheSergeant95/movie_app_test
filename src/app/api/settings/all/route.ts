import { fetchAppSettings } from "@/http/itemAPI";
import { HTTP_STATUS } from "@/utils/constaints";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetchAppSettings();
    if (res.status !== HTTP_STATUS.OK) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }
    let data = res.data;

    if (!data) return NextResponse.json({ message: 'Настройки не найдены' }, { status: HTTP_STATUS.NOT_FOUND });

    return NextResponse.json({ data }, { status: res.status });
}