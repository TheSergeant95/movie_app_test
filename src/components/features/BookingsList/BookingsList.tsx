"use client";
import React, { FC } from "react";
import { CountdownTimer } from "../../ui/CountdownTimer";
import { BookingType, ItemAPIResponseType } from "@/types";
import { BookingsListItem } from "../BookingsListItem";
import { Button } from "../../ui/Button";
import { useBookings } from "@/hooks/useBookings";
import { HTTP_STATUS } from "@/utils/constaints";

interface BookingsListProps {
    res: ItemAPIResponseType<BookingType[]>;
    timeLimit: number;
}

const ListTitle = ({ title }: { title: string }) => <><h3 className="col-span-full pt-6">{title}</h3><hr className="col-span-full"></hr></>

const BookingsList: FC<BookingsListProps> = ({ res, timeLimit }) => {
    const { status, bookings, processingId, error, handlePayment, handleTimeout } = useBookings({ initialData: res?.data || [], initialStatus: res.status, timeLimit });

    if (status === HTTP_STATUS.NOT_FOUND) return <p className="p-2 text-center col-span-full">На данный момент у вас нет билетов</p>

    return (
        <>
            {!!bookings?.unpaidBookings.length &&
                <>
                    <ListTitle title="Неоплаченные" />
                    {bookings.unpaidBookings.map((booking: BookingType) => (
                        <BookingsListItem key={booking.id} booking={booking}>
                            <Button onClick={() => handlePayment(booking.id)} disabled={processingId === booking.id}>Оплатить</Button>
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
                    <ListTitle title="Будущие" />
                    {bookings.futureBookings.map((booking: BookingType) => (
                        <BookingsListItem key={booking.id} booking={booking} />
                    ))}
                </>
            }
            {
                !!bookings?.pastBookings.length &&
                <>
                    <ListTitle title="Прошедшие" />
                    {bookings.pastBookings.map((booking: BookingType) => (
                        <BookingsListItem key={booking.id} booking={booking} />
                    ))}
                </>
            }
        </>
    )
}

export default BookingsList;
