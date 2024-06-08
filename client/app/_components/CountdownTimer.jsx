'use client'
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
    const [targetDate, setTargetDate] = useState(null);
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const target = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
        setTargetDate(target);

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = target - now;
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: String(Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0)).padStart(2, '0'),
                    hours: String(Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0)).padStart(2, '0'),
                    minutes: String(Math.max(Math.floor((difference / 1000 / 60) % 60), 0)).padStart(2, '0'),
                    seconds: String(Math.max(Math.floor((difference / 1000) % 60), 0)).padStart(2, '0'),
                };
            } else {
                timeLeft = {
                    days: '00',
                    hours: '00',
                    minutes: '00',
                    seconds: '00',
                };
            }

            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const units = [
        { label: 'Days', value: 'days' },
        { label: 'Hours', value: 'hours' },
        { label: 'Minutes', value: 'minutes' },
        { label: 'Seconds', value: 'seconds' },
    ];

    if (!targetDate) {
        return <Loading />;
    }

    return (
        <div className="flex gap-4 items-center lg:-translate-y-7">
            {units.map((unit) => (
                <div key={unit.label}>
                    <span className="block text-sm font-medium mb-2">{unit.label}</span>
                    <span className="text-3xl md:text-5xl font-semibold flex items-center gap-4">
                        {timeLeft[unit.value]}
                        <span className='text-3xl text-red'>
                            {unit.value !== 'seconds' && ':'}
                        </span>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
