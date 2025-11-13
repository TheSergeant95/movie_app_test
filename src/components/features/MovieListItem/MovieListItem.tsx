import React, { FC } from "react";
import { Button } from "@/components/ui/Button";
import { convertMinutesToHHMMFormat } from "@/utils/utils";
import { MovieType } from "@/types";
import Image from "next/image";

interface MovieListItemProps {
    data: MovieType;
    imageSize?: string;
}

const MovieListItem: FC<MovieListItemProps> = ({ data, imageSize = "size-[43px]" }) => {
    return (
        <>
            <Image src={`${process.env.NEXT_APP_STATIC_URL}${data.posterImage}`} alt={data.title} className={`${imageSize} object-cover`} />
            <h3>{data.title}</h3>
            <p>{convertMinutesToHHMMFormat(data.lengthMinutes)}</p>
            <p>{data.rating}</p>
            <Button href={`/movies/${data.id}`}>Просмотреть сеансы</Button>
        </>
    )
}
export default MovieListItem;