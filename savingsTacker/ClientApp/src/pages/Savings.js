import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container } from 'reactstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { FetchSavingsByUserId, FetchGroupsByUserId, FetchUserById } from '../axios/fetch-api';

export default function Orders() {
    const userId = "a0cf219d-6bdb-444f-8013-76a7fd4c4fa1";
    const [savings, setSavings] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        FetchSavingsByUserId(userId)
            .then(response => setSavings(response));

        FetchGroupsByUserId(userId).then(response => setGroups(response));
    }, []);

    //VARIABLES AND FUNCTION FOR GROUP DROP DOWN BOX
    const [selectedGroup, setSelectedGroup] = React.useState([]);

    return (
        <div>
            <div className="flex-column">
                <div className="dashboard-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: '1em' }}>Savings</h2>
                    <Paper
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}
                        sx={{ height: 110, width: 170, }}>
                        <div>
                            <h6 style={{ padding: '10px' }}>Total savings</h6>
                        </div>
                        <div style={{ alignSelf: 'center' }}>
                            <h4>₱0.00</h4>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: '3px' }} >
                            <IconButton aria-label="add savings" color="primary" title="Add Savings" style={{ top: '-15px' }} >
                                <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </div>
                    </Paper>
                </div>

                <div style={{ backgroundColor: '#F4F4F4' }}>
                    <Container style={{ marginBottom: '1.5em' }}>
                        <p style={{ height: '10px' }}></p>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', flexWrap: 'wrap', marginTop: '10px', marginBottom: '10px', marginLeft: '15em' }}>
                            <div style={{ flex: '60%' }}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <div style={{ flex: '5%' }} />
                            <div style={{ flex: '35%' }}>
                                <Autocomplete
                                    value={selectedGroup}
                                    onChange={(event, newValue) => {
                                        setSelectedGroup(newValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={groups.map(group => group.groupName)}
                                    renderInput={(params) => <TextField {...params} label="Group" />}
                                />
                            </div>
                        </div>
                        <SavingsTable rows={savings} />
                    </Container>
                </div>
            </div>
        </div>
    );
}

export function SavingsTable({ rows }) {
    const [userContributor, setUserContributor] = useState('');
    const [userUpdated, setUserUpdated] = useState('');
    const [formattedAddedDate, setFormattedAddedDate] = useState("");
    const [formattedUpdatedDate, setFormattedUpdatedDate] = useState("");
    const defaultDate = 'February 1, 1';
    const columns = [
        {
            field: 'userId', headerName: 'Contributor', width: 200,
            valueGetter: (params) => {
                const userId = params.row.userId;
                console.log(userId);
                getUsername(userId, true);
                return userContributor;
            },
        },
        { field: 'amount', headerName: 'Amount', type: 'number', width: 100 },
        {
            field: 'dateContributed', headerName: 'Date Contributed', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateContributed;
                formatDate(date, true);
                return formattedAddedDate === defaultDate ? '': formattedAddedDate;
            },
        },
        {
            field: 'updatedBy', headerName: 'Updated By', width: 200,
            valueGetter: (params) => {
                const userId = params.row.updatedBy;
                console.log(userId);
                getUsername(userId, false);
                return userUpdated;
            },
        },
        {
            field: 'dateUpdated', headerName: 'Date Updated', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateUpdated;
                formatDate(date, false);
                return formattedUpdatedDate === defaultDate ? '' : formattedUpdatedDate;
            },
        },
        {
            field: 'isActive', headerName: 'Status', width: 100,
            valueGetter: (params) => {
                const status = params.row.isActive;
                return status ? 'Active' : 'Inactive';
            },
        },
    ];

    function getUsername(userId, isContributor) {
        if (!userId) {
            console.log('here');
            return;
        }

        FetchUserById(userId)
            .then(response => {
                isContributor ? setUserContributor(`${response.firstName} ${response.lastName}`) :
                    setUserUpdated(`${response.firstName} ${response.lastName}`);
            });
    }

    function formatDate(dateString, isAdded) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date(dateString);
        const mm = months[date.getMonth() + 1];
        const dd = date.getDate();
        const yyyy = date.getFullYear();


        isAdded ? setFormattedAddedDate(`${mm} ${dd}, ${yyyy}`) : setFormattedUpdatedDate(`${mm} ${dd}, ${yyyy}`);
    }

    //VARIABLES/FUNCTIONS TO SAVE SPECIFIC DATA OF A GROUP
    const [selectedGroup, setSelectedGroup] = React.useState([]);

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
                onRowClick={(params) => {
                    setSelectedGroup(params.row);
                }}
            />
        </div>
    );
}