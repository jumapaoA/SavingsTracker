import React, { useEffect, useState } from 'react';

export default function PrettifyDate({ dateString, includeTime }) {
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    const date = new Date(dateString);
    const mm = months[date.getMonth() + 1];
    const dd = date.getDate();
    const yyyy = date.getFullYear();
    const hh = date.getHours();
    const hour = hh > 9 ? hh : `0${hh-12}`;
    const min = date.getMinutes();
    const minute = min > 9 ? min : `0${min}`;
    const sec = date.getSeconds();
    const ss = sec > 9 ? sec : `0${sec}`;
    const AMorPM = hh >= 12 ? 'PM' : 'AM';

    const [formattedDate, setFormattedDate] = useState("");
    const defaultDate = includeTime ? 'February 1, 1 0-12:00:00 AM' : 'February 1, 1';
    

    useEffect(() => {
        includeTime ? setFormattedDate(`${mm} ${dd}, ${yyyy} ${hour}:${minute}:${ss} ${AMorPM}`) :
            setFormattedDate(`${mm} ${dd}, ${yyyy}`);
    }, []);

    return (
        <div>
            {formattedDate === defaultDate ? '' : formattedDate}
        </div>
    );
}