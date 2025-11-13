import { HTTP_STATUS } from "@/utils/constaints";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = cookies();    
    (await cookieStore).delete('token');
    return NextResponse.json({ message: "Пользователь успешно вышел" }, { status: HTTP_STATUS.OK });
}