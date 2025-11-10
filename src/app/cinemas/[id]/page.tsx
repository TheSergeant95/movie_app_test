import React from "react";
import { getData } from "@/utils/getData";
import { notFound } from "next/navigation";
import ContentBlock from "@/components/layout/ContentBlock";
import { createMovieSessionsList } from "@/utils/utils";
import Button from "@/components/Button";
import SubtitleBlock from "@/components/SubtitleBlock";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const cinemaId = (await params).id;
    const cinemaRes = await getData("cinema/all", false, { id: cinemaId });

    if (cinemaRes.status === 404) notFound();

    const cinema = cinemaRes.data[0];
    const sessionsRes = await getData(`session/all/cinema/${cinemaId}`);

    let sessions = null;
    if (sessionsRes.data) {
        sessions = createMovieSessionsList(sessionsRes.data);
    };

    return (
        <ContentBlock>
            <SubtitleBlock>{cinema.name}</SubtitleBlock>
            {sessionsRes.status === 404 && <p className="p-2 text-center">На данный момент сеансов нет</p>}
            <div className="py-[20px] grid grid-cols-[43px_repeat(2,_1fr)] gap-[20px] items-center">
                {Object.keys(sessions || {}).map((date, dateIndex) => (
                    date &&
                    <React.Fragment key={dateIndex}>
                        <h3 className="col-span-full pt-6">{date}</h3>
                        <hr className="col-span-full"></hr>
                        {Object.keys(sessions?.[date] || {}).map((movie, cinIndex) => (
                            movie &&
                            <React.Fragment key={cinIndex}>
                                <img src={`${process.env.NEXT_APP_STATIC_URL}${sessions?.[date]?.[movie]?.moviePoster}`} className="size-[43px] object-cover rounded-2xl object-top" alt={movie} />
                                <p>{movie}</p>
                                <div className="flex gap-[10px]">
                                    {Object.keys(sessions?.[date]?.[movie] || {}).map((time, timeIndex) => (
                                        time && sessions?.[date]?.[movie]?.[time] && time !== 'moviePoster' &&
                                        <Button key={timeIndex} href={`/sessions/${sessions?.[date]?.[movie]?.[time]}`}>{time}</Button>
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
