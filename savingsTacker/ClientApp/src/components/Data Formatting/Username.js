import React, { useEffect, useState } from 'react';
import { FetchUserById } from '../../axios/fetch-api';

export default function Username({ userId }) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        FetchUserById(userId)
            .then(response => {
                setUser(response);
            });
    }, []);

    return (
        <div>
            { user.firstName+" "+user.lastName }
        </div>
    );
}