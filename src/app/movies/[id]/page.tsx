import React from "react";
import { getData } from "@/utils/getData";
import { notFound } from "next/navigation";
import ContentBlock from "@/components/layout/ContentBlock";
import { convertMinutesToHHMMFormat, createMovieSessionsList } from "@/utils/utils";
import Button from "@/components/Button";
import SubtitleBlock from "@/components/SubtitleBlock";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const movieId = (await params).id;
    const movieRes = await getData("movie/all", false, { id: movieId });
    if (movieRes.status === 404) notFound();
    const movie = movieRes.data[0];
    const sessionsRes = await getData(`session/all/movie/${movieId}`);
    let sessions = null;
    if (sessionsRes.data) {
        sessions = createMovieSessionsList(sessionsRes.data, 'cinema');
    };

    return (
        <ContentBlock>
            <SubtitleBlock>{movie.title}</SubtitleBlock>
            <div className="flex justify-between gap-x-[30px]">
                <div className="size-[98px] rounded-2xl overflow-hidden shrink-0">
                    <img src={`${process.env.NEXT_APP_STATIC_URL}${movie.posterImage}`} alt={movie.title} className="w-full object-cover" />
                </div>
                <div className="grow">
                    <p>{movie.description}</p>
                    <div className="pt-[11px]">
                        <p>Год: {movie.year}</p>
                        <p>Продолжительность: {convertMinutesToHHMMFormat(movie.lengthMinutes)}</p>
                        <p>Рейтинг: {movie.rating}</p>
                    </div>
                </div>
            </div>
            {sessionsRes.status === 404 && <p className="p-2 text-center">На данный момент сеансов нет</p>}
            <div className="py-[20px] grid grid-cols-[repeat(2,_1fr)] gap-[20px] items-center">
                {Object.keys(sessions || {}).map((date, dateIndex) => (
                    date &&
                    <React.Fragment key={dateIndex}>
                        <h3 className="col-span-full pt-6">{date}</h3>
                        <hr className="col-span-full"></hr>
                        {Object.keys(sessions?.[date] || {}).map((cinema, cinIndex) => (
                            cinema &&
                            <React.Fragment key={cinIndex}>
                                <p>{cinema}</p>
                                <div className="flex gap-[10px]">
                                    {Object.keys(sessions?.[date]?.[cinema] || {}).map((time, timeIndex) => (
                                        time && sessions?.[date]?.[cinema]?.[time] &&
                                        <Button key={timeIndex} href={`/sessions/${sessions?.[date]?.[cinema]?.[time]}`}>{time}</Button>
                                    ))}
                                </div>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </ContentBlock>
    );
}

