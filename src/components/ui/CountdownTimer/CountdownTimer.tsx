"use client";
import { convertMilisecondsToMMSSFormat } from '@/utils/utils';
import React, { FC, useEffect, useState } from 'react';

interface CountdownTimerProps {
    targetDate: Date;
    startTime?: Date;
    timeLimit: number;
    onTimeout?: () => void;
}

const CountdownTimer: FC<CountdownTimerProps> = ({ targetDate, startTime, timeLimit, onTimeout }) => {
    const calculateTimeLeft = () => {
        let endDate = startTime ? new Date(startTime).getTime() : null;
        const endDateForLimit = new Date(targetDate).getTime() + timeLimit * 1000;
        if (!endDate || endDateForLimit < endDate) {
            endDate = endDateForLimit;
        }
        const difference = Math.max(0, endDate - Date.now());

        return difference;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = calculateTimeLeft();
            if (difference <= 0) {
                clearInterval(timer);
                onTimeout && onTimeout();
            }
            setTimeLeft(difference);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <span>{convertMilisecondsToMMSSFormat(timeLeft)}</span>
    );
};

export default CountdownTimer;
