import React from "react";
import { CinemaListItem } from "@/components/features/CinemaListItem";
import { CinemaType } from "@/types";
import { getData } from "@/utils/getData";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { HTTP_STATUS } from "@/utils/constaints";

const Page = async () => {
    const res = await getData("cinema/all");
    if (res?.status && res.status == HTTP_STATUS.NOT_FOUND) {
        return <div className="p-2 text-center">Кинотеатры не найдены</div>;
    }
    const { data } = res;

    const cellClassName = "px-[20px]";

    return (
        <ContentBlock className="grid grid-cols-[repeat(2,_auto)_140px] gap-[20px] items-center py-[20px]">
            <div className={cellClassName}>Кинотеатр</div>
            <div className={cellClassName}>Адрес</div>
            <div className={cellClassName}></div>
            <hr className="col-span-full" />
            {data.map((cinemaItem: CinemaType) => (
                <CinemaListItem key={cinemaItem.id} data={cinemaItem} cellClassName={cellClassName} />
            ))}
        </ContentBlock>
    );
}

export default Page;