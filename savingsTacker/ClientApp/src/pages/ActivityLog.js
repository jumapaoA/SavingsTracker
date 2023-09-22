import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { DataGrid } from '@mui/x-data-grid';

import { FetchActivityLog } from '../axios/fetch-api';

const userId = "a0cf219d-6bdb-444f-8013-76a7fd4c4fa1";
//const userId = "ab8ebde1-5431-42e0-9db0-ba001529ca1f";

export default function ActivityLog() {
    const [dataRow, setDataRow] = useState([]);

    useEffect(() => {
        FetchActivityLog(userId)
            .then(response => {
                console.log(response);
                setDataRow(response);
            });
    }, []);

    return (
        <div>
            <div className="flex-column">
                <div className="dashboard-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: '1em' }}>Activity Log</h2>
                </div>

                <div style={{ backgroundColor: '#F4F4F4' }}>
                    <Container style={{ marginBottom: '1.5em' }}>
                        <p style={{ height: '5px' }}></p>
                        <SavingsTable rows={dataRow} />
                    </Container>
                </div>
            </div>
        </div>
    );
}

export function SavingsTable({ rows }) {
    const defaultDate = 'February 1, 1';
    const columns = [
        {
            field: 'message', headerName: 'Message', width: 500 ,
        },
        {
            field: 'dateAccess', headerName: 'Date Accessed', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateAccess;
                const formattedUpdatedDate =  formatDate(date);
                return formattedUpdatedDate === defaultDate ? '' : formattedUpdatedDate;
            },
        }
    ];

    function formatDate(dateString) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date(dateString);
        const mm = months[date.getMonth() + 1];
        const dd = date.getDate();
        const yyyy = date.getFullYear();
        const stringDate = `${mm} ${dd}, ${yyyy}`;

        return stringDate;
    }
    
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}