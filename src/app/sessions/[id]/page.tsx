"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import ContentBlock from "@/components/layout/ContentBlock";
import { formatDate, formatTime } from "@/utils/utils";
import SeatMap from "@/components/layout/SeatMap";
import { SessionType } from "@/types";
import { postData } from "@/utils/postData";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import { getDataClient } from "@/utils/getDataClient";
import { useAuth } from "@/hooks/useAuth";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
    const { logoutUser } = useAuth();
    const sessionId = use(params).id;
    const router = useRouter();
    const [buttonText, setButtonText] = useState<"Забронировать" | "Забронировано">("Забронировать");
    const [session, setSession] = useState<SessionType | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<Set<string>>(new Set());

    useEffect(() => {
        getDataClient("session/get/" + sessionId)
            .then((res) => {
                if (res.status && res.status == 404) {
                    notFound();
                }
                setSession(res.data);
            })
    }, []);

    const handleReserve = useCallback(async () => {
        const reservedSeats = Array.from(selected).map(s => {
            const [r, c] = s.split("-");
            return { rowNumber: +r, seatNumber: +c };
        });
        setButtonText("Забронировано");
        setDisabled(true);
        const res = await postData(`user/bookings/create/${sessionId}`, { seats: reservedSeats });
        setDisabled(false);
        setSelected(new Set());
        setButtonText("Забронировать");
        if (res.status === 200) {
            setError(null);
            router.push("/bookings");
        } else {
            setError(res.message);
            if (res.status === 401) {
                logoutUser().then(() => {
                    router.push("/login");       
                });
            }
        }
    }, [sessionId, selected, setButtonText, setDisabled, router]);

    const sessionTimeFormatted = session && `${formatDate(session.startTime)}, ${formatTime(session.startTime)}`

    return (
        <ContentBlock>
            <h2 className="p-2 text-center text-2xl">Выбрать места</h2>
            <div className={`w-full pb-4 ${!session && "flex justify-center items-center"}`}>
                {session ?
                    <>
                        <div className="py-[24px]">
                            <p>Фильм: {session.movieName}</p>
                            <p>Дата: {session.cinemaName}</p>
                            <p>Время: {sessionTimeFormatted}</p>
                        </div>
                        <SeatMap seats={session.seats} bookedSeats={session.bookedSeats} sessionId={sessionId} selected={selected} setSelected={setSelected} />
                        <div className="mt-4 flex justify-center">
                            <Button sizeClass="py-[10px] px-[16px] mx-auto" onClick={handleReserve} disabled={selected.size === 0 || disabled}>{buttonText}</Button>
                        </div>
                        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                    </>
                    :
                    <Loading />
                }
            </div>
        </ContentBlock>
    );
}
