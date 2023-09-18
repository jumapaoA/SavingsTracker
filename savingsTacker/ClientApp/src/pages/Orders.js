import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { FetchUserById, FetchSavingsByUserId } from '../axios/fetch-api';
import Username from '../components/Data Formatting/Username';
import PrettifyDate from '../components/Data Formatting/Date';

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        FetchSavingsByUserId("a0cf219d-6bdb-444f-8013-76a7fd4c4fa1")
            .then(response => setRows(response));
    }, []);

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Contributor</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date Contributed</TableCell>
                        <TableCell>Updated By</TableCell>
                        <TableCell>Date Updated</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Username userId={row.userId} />
                            </TableCell>
                            <TableCell>₱{row.amount}</TableCell>
                            <TableCell>
                                <PrettifyDate dateString={row.dateContributed} />
                            </TableCell>
                            <TableCell>{row.userUpdated}</TableCell>
                            <TableCell>
                                <PrettifyDate dateString={row.dateUpdated} includeTime={false} />
                            </TableCell>
                            <TableCell align="right">
                                {
                                    row.isActive? 'Active': 'Deactive'
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}
