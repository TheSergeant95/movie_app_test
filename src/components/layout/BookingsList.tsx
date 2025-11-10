"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import CountdownTimer from "../CountdownTimer";
import { BookingType, ItemAPIResponseType } from "@/types";
import { createMovieBookingsList } from "@/utils/utils";
import BookingsListItem from "../BookingsListItem";
import Button from "../Button";
import { UUID } from "crypto";
import { postData } from "@/utils/postData";
import { getDataClient } from "@/utils/getDataClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface BookingsListProps {
    res: ItemAPIResponseType<BookingType[]>;
    timeLimit: number;
}

const BookingsList: React.FC<BookingsListProps> = ({ res, timeLimit }) => {
    let processedData = useMemo(() => createMovieBookingsList(res.data || []), [res.data]);
    const router = useRouter();
    const { logoutUser } = useAuth();
    const [status, setStatus] = useState(res.status);
    const [bookings, setBookings] = useState(processedData);
    const [processingId, setProcessingId] = useState<UUID | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const refreshBookings = useCallback(async () => {
        const newBookings = await getDataClient("user/bookings/all", true);
        setStatus(newBookings.status);
        if (newBookings.status === 200) {
            setBookings(createMovieBookingsList(newBookings.data));
            setError(null);
        } else {
            setError(newBookings.message);
        }
    }, []);


    const handleClick = useCallback(async (bookingId: UUID) => {
        setProcessingId(bookingId);
        const res = await postData(`user/bookings/set/${bookingId}/payment`);
        res.status === 200 ? await refreshBookings() : res.status === 401 ? logoutUser().then(() => router.push('/login')) : setError(res.message);
        setProcessingId(null);
    }, [refreshBookings]);

    const handleTimeout = useCallback(async (bookingId: UUID) => {
        setProcessingId(bookingId);
        await refreshBookings();
        setProcessingId(null);
    }, [refreshBookings]);

    useEffect(() => {
        if (res.status && res.status == 401) {
            logoutUser().then(() => {
                router.push('/login');
            });
        }
    }, [refreshBookings]);

    return (
        <>
            {status === 404 && <p className="p-2 text-center col-span-full">На данный момент у вас нет билетов</p>}
            {!!bookings?.unpaidBookings.length &&
                <>
                    <h3 className="col-span-full pt-6">Неоплаченные</h3>
                    <hr className="col-span-full"></hr>
                    {bookings.unpaidBookings.map((booking: BookingType) => (
                        <BookingsListItem key={booking.id} booking={booking}>
                            <Button onClick={() => handleClick(booking.id)} disabled={processingId === booking.id}>Оплатить</Button>
                            <div>
                                Осталось <CountdownTimer targetDate={booking.bookedAt} startTime={booking.startTime} timeLimit={timeLimit} onTimeout={() => handleTimeout(booking.id)} />
                                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                            </div>
                        </BookingsListItem>
                    ))}
                </>
            }
            {!!bookings?.futureBookings.length &&
                <>
                    <h3 className="col-span-full pt-6">Будущие</h3>
                    <hr className="col-span-full"></hr>
                    {bookings.futureBookings.map((booking: BookingType) => (
                        <BookingsListItem key={booking.id} booking={booking} />
                    ))}
                </>
            }
            {
                !!bookings?.pastBookings.length &&
                <>
                    <h3 className="col-span-full pt-6">Прошедшие</h3>
                    <hr className="col-span-full"></hr>
                    {bookings.pastBookings.map((booking: BookingType) => (
                        <BookingsListItem key={booking.id} booking={booking} />
                    ))}
                </>
            }
        </>
    )
}

export default BookingsList;
