"use client";
import React, { FC } from "react";
import { BookingType, SeatPositionType } from "@/types";
import { formatDate, formatTime } from "@/utils/utils";

interface BookingsListItemProps {
    booking: BookingType;
    children?: React.ReactNode
}

const BookingsListItem: FC<BookingsListItemProps> = ({ booking, children }) => {
    return (
        <>
            <div>
                <p>{booking.movieName}</p>
                <p>{booking.cinemaName}</p>
                {<p>{booking.startTime && `${formatDate(booking.startTime)}, ${formatTime(booking.startTime)}`}</p>}
            </div>
            <div>
                {booking.seats.map((seat: SeatPositionType, seatIndex: number) => (
                    <p key={seatIndex}>Ряд {seat.rowNumber}, место {seat.seatNumber}</p>
                ))}
            </div>
            {children || <div className="col-span-2"></div>}
        </>
    )
}

export default BookingsListItem;