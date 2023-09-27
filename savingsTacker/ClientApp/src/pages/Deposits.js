﻿import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

import { FetchSavingsByUserId, FetchGroupsByUserId, FetchSavingsByGroupId } from '../axios/fetch-api';

const userId = "a0cf219d-6bdb-444f-8013-76a7fd4c4fa1";

export default function Deposits() {
    const [savings, setSavings] = useState([]);
    const [totalSavings, setTotalSavings] = useState(0);
    const [latestSavings, setLatestSavings] = useState(0);

    useEffect(() => {
        FetchSavingsByUserId(userId)
            .then(response => {
                setSavings(response);
            });
    }, []);

    useEffect(() => {
        getTotalSavings();

        const latestData = savings.reduce((latest, current) => {
            const latestContributedDate = new Date(latest.dateContributed || 0); // Initialize with 0 to handle cases where dateAdded is missing
            const currentContributedDate = new Date(current.dateContributed || 0);
            const latestUpdatedDate = new Date(latest.dateUpdated || 0); 
            const currentUpdatedDate = new Date(current.dateUpdated || 0);

            const resCurrent = currentContributedDate > currentUpdatedDate ? currentContributedDate : currentUpdatedDate;
            const resLatest = latestContributedDate > latestUpdatedDate ? latestContributedDate : latestUpdatedDate;

            return resCurrent > resLatest ? current : latest;
        }, {});

        setLatestSavings(latestData);
    }, [savings]);

    function getTotalSavings() {
        if (savings) {
            const calculatedTotalSavings = savings.reduce((total, item) => total + item.amount, 0);
            setTotalSavings(calculatedTotalSavings);
        }
    }

    function formatDate() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const dateAdded = new Date(latestSavings.dateContributed);
        const dateUpdated = new Date(latestSavings.dateUpdated);
        const date = dateAdded > dateUpdated ? dateAdded : dateUpdated;
        const mm = months[date.getMonth() + 1];
        const dd = date.getDate();
        const yyyy = date.getFullYear();
        const stringDate = `${dd} ${mm}, ${yyyy}`;

        return stringDate;
    }

    return (
        <React.Fragment>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                ₱{totalSavings}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {formatDate()}
            </Typography>
            <div>
                <Link color="primary" href="/saving">
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}
