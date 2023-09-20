import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Container } from 'reactstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { FetchSavingsByUserId, FetchGroupsByUserId, FetchUserById } from '../axios/fetch-api';

export default function Contributor() {
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
                    <h2 style={{ margin: '1em' }}>Groups</h2>
                    <Paper
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}
                        sx={{ height: 110, width: 170, }}>
                        <div>
                            <h6 style={{ padding: '10px' }}>Total groups</h6>
                        </div>
                        <div style={{ alignSelf: 'center' }}>
                            <h4>{groups.length}</h4>
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

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px', marginBottom: '10px', marginLeft: '15em' }}>
                            <div style={{ flex: '40%' }}></div>
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
                        </div>
                        <GroupsTable rows={groups} />
                    </Container>
                </div>
            </div>
        </div>
    );
}

export function GroupsTable({ rows }) {
    const [formattedAddedDate, setFormattedAddedDate] = useState("");
    const [formattedUpdatedDate, setFormattedUpdatedDate] = useState("");
    const defaultDate = 'February 1, 1';
    const columns = [
        { field: 'id', headerName: 'Number', width: 100 },
        { field: 'groupName', headerName: 'Name', width: 200, },
        { field: 'groupDescription', headerName: 'Description', width: 200, },
        {
            field: 'dateCreated', headerName: 'Date Created', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateCreated;
                formatDate(date, true);
                return formattedAddedDate === defaultDate ? '' : formattedAddedDate;
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

    function formatDate(dateString, isAdded) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date(dateString);
        const mm = months[date.getMonth() + 1];
        const dd = date.getDate();
        const yyyy = date.getFullYear();


        isAdded ? setFormattedAddedDate(`${mm} ${dd}, ${yyyy}`) : setFormattedUpdatedDate(`${mm} ${dd}, ${yyyy}`);
    }

    //VARIABLES/FUNCTIONS TO SAVE SPECIFIC DATA OF A GROUP

    const handleRowClick = (rowData) => {
        console.log('Row clicked:', rowData);
    };

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
                    handleRowClick(params.row);
                }}
            />
        </div>
    );
}