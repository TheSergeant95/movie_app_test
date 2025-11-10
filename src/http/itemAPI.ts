import { UUID } from "crypto";
import { $host, $authHost } from "./index";
import { BookingType, CinemaType, ItemAPIResponseType, MovieType, SeatPositionType, SessionType } from "../types";
import { NextRequest } from "next/server";
import { getResponseData, getResponseError } from "./getResponse";
import { Session } from "inspector/promises";

export const fetchUserBookings = async (req: NextRequest): Promise<ItemAPIResponseType<BookingType[]>> => {
    try {
        const response = await $authHost.get("/me/bookings", {
            withCredentials: true,
            headers: { cookie: req.headers.get("cookie") },
        });
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const setBookingAsPaid = async (bookingId: UUID): Promise<ItemAPIResponseType<{ message: string }>> => {
    try {
        const response = await $authHost.post(`/bookings/${bookingId}/payments`);
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const fetchCinemasList = async (): Promise<ItemAPIResponseType<CinemaType[]>> => {
    try {
        const response = await $host.get("/cinemas");
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const fetchCinemaSessionsList = async (cinemaId: number): Promise<ItemAPIResponseType<SessionType[]>> => {
    try {
        const response = await $host.get(`/cinemas/${cinemaId}/sessions`);
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const fetchMoviesList = async (): Promise<ItemAPIResponseType<MovieType[]>> => {
    try {
        const response = await $host.get("/movies");
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const fetchMovieSessionsList = async (movieId: number): Promise<ItemAPIResponseType<SessionType[]>> => {
    try {
        const response = await $host.get(`/movies/${movieId}/sessions`);
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const fetchMovieSession = async (movieSessionId: number): Promise<ItemAPIResponseType<SessionType>> => {
    try {
        const response = await $host.get(`/movieSessions/${movieSessionId}`);
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const setMovieSessionAsBooked = async (movieSessionId: number, seats: SeatPositionType[]): Promise<ItemAPIResponseType<{bookingId: UUID}>> => {
    try {
        const response = await $authHost.post(`/movieSessions/${movieSessionId}/bookings`, { seats });
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};

export const fetchAppSettings = async (): Promise<ItemAPIResponseType<{bookingPaymentTimeSeconds: number}>> => {
    try {
        const response = await $host.get("/settings");
        return getResponseData(response);
    } catch (error: any) {
        return getResponseError(error);
    }
};
