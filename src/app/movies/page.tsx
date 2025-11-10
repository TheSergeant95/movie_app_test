import React from "react";
import ContentBlock from "@/components/layout/ContentBlock";
import MovieListItem from "@/components/MovieListItem";
import { MovieType } from "@/types";
import { getData } from "@/utils/getData";

const Page = async () => {
    const res = await getData("movie/all");
    if (res?.status && res.status == 404) {
        return <div>Фильмы не найдены</div>;
    }

    const { data } = res;

    return (
        <ContentBlock className="grid grid-cols-[43px_repeat(3,_auto)_140px] gap-[20px] items-center py-[20px]">
            <div></div>
            <div>Название</div>
            <div>Продолжительность</div>
            <div>Рейтинг</div>
            <div></div>
            <hr className="col-span-full" />
            {data.map((movieItem: MovieType) => (
                <MovieListItem key={movieItem.id} data={movieItem} />
            ))}
        </ContentBlock>
    );
}

export default Page;