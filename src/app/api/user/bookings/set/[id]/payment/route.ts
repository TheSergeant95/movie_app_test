import { setBookingAsPaid } from "@/http/itemAPI";
import { UUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: UUID }> }) {
    const bookingId = (await params).id;
    const res = await setBookingAsPaid(bookingId);
    if (res.status !== 200) {
        return NextResponse.json({ message: res.message }, { status: res.status });
    }

    const data = res.data;

    return NextResponse.json({ data }, { status: res.status });
}