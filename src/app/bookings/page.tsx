import React from "react";
import { SubtitleBlock } from "@/components/ui/SubtitleBlock";
import { BookingsList } from "@/components/features/BookingsList";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { getData } from "@/utils/getData";
import { TIME } from "@/utils/constaints";

export default async function Page() {
    const res = await getData("user/bookings/all", true);
    const timeLimit = (await getData("settings/all"))?.data?.bookingPaymentTimeSeconds || TIME.DEFAULT_PAYMENT_LIMIT;

    return (
        <ContentBlock>
            <SubtitleBlock>Мои билеты</SubtitleBlock>
            <div className="pb-[20px] grid grid-cols-[repeat(4,_1fr)] gap-[20px] items-start">
                <BookingsList res={res} timeLimit={timeLimit} />
            </div>
        </ContentBlock>
    )
}