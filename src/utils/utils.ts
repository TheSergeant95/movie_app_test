import { BookingType, GeneratedMovieSessionsType, SessionType } from "@/types";

export const convertMinutesToHHMMFormat = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}`;
}

export const convertMilisecondsToMMSSFormat = (miliseconds: number) => {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Math.floor((miliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export const createMovieSessionsList = (sessions: SessionType[], type: 'movie' | 'cinema' = 'movie'): GeneratedMovieSessionsType => {
    return sessions.reduce((result: GeneratedMovieSessionsType, session) => {
        const date = formatDate(session.startTime);
        const typeId = session[`${type}Name`] || session[`${type}Id`].toString();
        const russianTime = formatTime(session.startTime);
        return {
            ...result,
            [date]: {
                ...result[date],
                [typeId]: {
                    ...result[date]?.[typeId] || {},
                    [russianTime]: session.id.toString(),
                    moviePoster: session.moviePoster || '',
                },
            },
        };
    }, {});
}

export const createMovieBookingsList = (bookings: BookingType[]) => {
    if (!bookings || bookings.length == 0) return { pastBookings: [], futureBookings: [], unpaidBookings: [] };
    const now = new Date().getTime();
    const pastBookings = bookings.filter(booking => booking?.startTime && new Date(booking.startTime).getTime() < now && booking.isPaid);
    const futureBookings = bookings.filter(booking => booking?.startTime && new Date(booking.startTime).getTime() >= now && booking.isPaid);
    const unpaidBookings = bookings.filter(booking => booking?.startTime && new Date(booking.startTime).getTime() >= now && !booking.isPaid);
    return {
        pastBookings,
        futureBookings,
        unpaidBookings,
    };
}

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' }).split('.').slice(0, 2).join('.');
}

export const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }).split(':').slice(0, 2).join(':');
}
