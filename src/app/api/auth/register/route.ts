import { register } from "@/http/authAPI";
import { HTTP_STATUS, TIME } from "@/utils/constaints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data = await register(body);
    if (data.status !== HTTP_STATUS.OK) {
        return NextResponse.json({ message: data.message }, { status: data.status });
    }
    return NextResponse.json({ message: "Пользователь успешно зарегистрирован", data: { token: data.token } }, { status: data.status, headers: { 'Set-Cookie': `token=${data.token}; Max-Age=${TIME.MAX_AGE}; Path=/` } });
}