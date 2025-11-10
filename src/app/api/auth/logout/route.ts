import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = cookies();    
    (await cookieStore).delete('token');
    return NextResponse.json({ message: "Пользователь успешно вышел" }, { status: 200 });
}