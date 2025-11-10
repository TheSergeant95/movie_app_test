import { login } from "@/http/authAPI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data = await login(body);

    if (data.status !== 200) {
        return NextResponse.json({ message: data.message }, { status: data.status });
    }

    return NextResponse.json({ message: "Пользователь успешно авторизован", data: { token: data.token } }, { status: data.status, headers: { 'Set-Cookie': `token=${data.token}; Max-Age=3600; Path=/` } });
}