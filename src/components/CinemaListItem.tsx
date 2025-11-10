import React, { FC } from "react";
import Button from "@/components/Button";
import { CinemaType } from "@/types";

interface CinemaListItemProps {
    data: CinemaType;
    cellClassName?: string
}

const CinemaListItem: FC<CinemaListItemProps> = ({ data, cellClassName = "" }) => {
    return (
        <>
            <h3 className={`${cellClassName}`}>{data.name}</h3>
            <p className={`${cellClassName}`}>{data.address}</p>
            <Button href={`/cinemas/${data.id}`}>Просмотреть сеансы</Button>
        </>
    )
}
export default CinemaListItem;