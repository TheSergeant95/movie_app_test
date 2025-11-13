import React from "react";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { MovieListItem } from "@/components/features/MovieListItem";
import { MovieType } from "@/types";
import { getData } from "@/utils/getData";
import { HTTP_STATUS } from "@/utils/constaints";

const Page = async () => {
    const res = await getData("movie/all");
    if (res?.status && res.status == HTTP_STATUS.NOT_FOUND) {
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