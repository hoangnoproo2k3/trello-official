import React, { useState, useEffect } from 'react';

interface DateDifferenceComponentProps {
    apiDate: string;
}

const DateDifferenceComponent: React.FC<DateDifferenceComponentProps> = ({ apiDate }) => {
    const [dateDifference, setDateDifference] = useState<string>('');
    useEffect(() => {
        if (apiDate) {
            const currentDate = new Date();
            const parsedApiDate = new Date(apiDate);
            const differenceInTime = currentDate.getTime() - parsedApiDate.getTime();
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

            if (differenceInDays === 0) {
                setDateDifference('Today');
            } else if (differenceInDays === 1) {
                setDateDifference('1 day ago');
            } else {
                setDateDifference(`${differenceInDays} days ago`);
            }
        }
    }, [apiDate]);

    return (
        <span className="text-gray-500">{dateDifference}</span>
    );
};

export default DateDifferenceComponent;
