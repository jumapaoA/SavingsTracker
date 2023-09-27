import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container } from 'reactstrap';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import Swal from 'sweetalert2';

import { FetchGroupsByUserId, FetchMembersByGroupId, FetchSavingsByGroupId, FetchSavingsByUserId, FetchUsers } from '../axios/fetch-api';

const userId = "a0cf219d-6bdb-444f-8013-76a7fd4c4fa1";
//const userId = "ab8ebde1-5431-42e0-9db0-ba001529ca1f";

export default function Reports() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedGroup, setSelectedGroup] = React.useState([]);
    const [savings, setSavings] = useState([]);
    const [groups, setGroups] = useState([]);
    const [dataRow, setDataRow] = useState([]);
    const tabs = [
        {
            id: 0, title: 'Savings', content: <SavingsTable savings={savings} selectedGroup={selectedGroup} setData={setDataRow} />
        },
        {
            id: 1, title: 'Groups', content: <GroupsTable groups={groups} setData={setDataRow} />
        },
        {
            id: 2, title: 'Group Members', content: <MembersTable selectedGroup={selectedGroup} setData={setDataRow} />
        },
    ];

    useEffect(() => {
        FetchSavingsByUserId(userId)
            .then(response => {
                setSavings(response);
            });

        FetchGroupsByUserId(userId).then(response => setGroups(response));
    }, []);

    useEffect(() => {

    }, [dataRow]);

    const handleChange = (event, newValue) => {
        setSelectedGroup([]);
        setActiveTab(newValue);
    };

    function onGroupChange(newValue) {
        if (newValue) {
            const selectedGroupObject = groups.find(group => group.groupName === newValue);
            setSelectedGroup(selectedGroupObject);
        }
        else {
            setSelectedGroup([]);
        }
    }


    return (
        <div>
            <div className="flex-column">
                <Tabs value={activeTab} onChange={handleChange} >
                    {
                        tabs.map(tab => {
                            return <Tab label={tab.title} key={tab.id} />
                        })
                    }
                </Tabs>
                <div className="dashboard-header" style={{ display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: '1em' }}>Groups</h2>
                </div>

                <div style={{ backgroundColor: '#F4F4F4' }}>
                    <Container style={{ marginBottom: '1.5em' }}>
                        <p style={{ height: '5px' }}></p>
                        {
                            activeTab !== 1 &&
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px', marginBottom: '10px', marginLeft: '15em' }}>
                                <div style={{ flex: '65%' }} />
                                <div style={{ flex: '35%' }}>
                                    <Autocomplete
                                        value={selectedGroup.groupName}
                                        onChange={(event, newValue) => {

                                            onGroupChange(newValue);
                                        }}
                                        id="controllable-states-demo"
                                        options={groups.map(group => group.groupName)}
                                        renderInput={(params) => <TextField {...params} label="Group" />}
                                    />
                                </div>
                            </div>
                        }
                        {tabs[activeTab].content}
                    </Container>
                </div>
            </div>
        </div>
    );
}


export function SavingsTable({ savings, selectedGroup, setData }) {
    const [users, setUsers] = useState([]);
    const [dataRow, setDataRow] = useState(savings);
    const defaultDate = 'February 1, 1';
    const columns = [
        {
            field: 'userId', headerName: 'Contributor', width: 200,
            valueGetter: (params) => {
                const userId = params.row.userId;
                return getUsername(userId);
            },
        },
        {
            field: 'amount', headerName: 'Amount', type: 'number', width: 100,
            valueGetter: (params) => {
                const value = params.row.amount;
                return `₱${value}`;
            },
        },
        {
            field: 'dateContributed', headerName: 'Date Contributed', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateContributed;
                const formattedAddedDate = formatDate(date, true);
                return formattedAddedDate === defaultDate ? '' : formattedAddedDate;
            },
        },
        {
            field: 'userUpdated', headerName: 'Updated By', width: 200,
            valueGetter: (params) => {
                const userId = params.row.userUpdated;
                return getUsername(userId);
            },
        },
        {
            field: 'dateUpdated', headerName: 'Date Updated', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateUpdated;
                const formattedUpdatedDate = formatDate(date);
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

    useEffect(() => {
        FetchUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    useEffect(() => {
        setDataRow(savings);
    }, [savings]);

    useEffect(() => {
        setData(dataRow);
    }, [dataRow]);

    useEffect(() => {
        if (selectedGroup) {
            const id = selectedGroup.id;
            if (id) {
                FetchSavingsByGroupId(id)
                    .then((response) => {
                        console.log(response);
                        setDataRow(response);
                    });
            }
            else {
                setDataRow(savings);
            }
        }
        else
            setDataRow(savings);
    }, [selectedGroup]);

    function getUsername(userId) {
        if (!userId) {
            return;
        }
        const foundUser = users.find(user => user.id === userId);
        return foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : '';
    }

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
                rows={dataRow}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 50, 100]}
                disableSelectionOnClick={true}
                slots={{ toolbar: GridToolbar }}
            />
        </div>
    );
}

export function GroupsTable({ groups, setData }) {
    const [users, setUsers] = useState([]);
    const defaultDate = 'February 1, 1';
    const columns = [
        { field: 'id', headerName: 'Number', width: 100 },
        { field: 'groupName', headerName: 'Name', width: 200, },
        { field: 'groupDescription', headerName: 'Description', width: 200, },
        {
            field: 'groupCreator', headerName: 'Creator', width: 200,
            valueGetter: (params) => {
                const userId = params.row.groupCreator;
                return getUsername(userId);
            },
        },
        {
            field: 'dateCreated', headerName: 'Date Created', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateCreated;
                const formattedAddedDate = formatDate(date, true);
                return formattedAddedDate === defaultDate ? '' : formattedAddedDate;
            },
        },
        {
            field: 'dateUpdated', headerName: 'Date Updated', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateUpdated;
                const formattedUpdatedDate = formatDate(date);
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

    useEffect(() => {
        setData(groups);
        FetchUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    function getUsername(userId) {
        if (!userId) {
            return;
        }
        const foundUser = users.find(user => user.id === userId);
        return foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : '';
    }

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
                rows={groups}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                slots={{ toolbar: GridToolbar }}
            />
        </div>
    );
}

export function MembersTable({ selectedGroup, setData }) {
    const [users, setUsers] = useState([]);
    const [dataRow, setDataRow] = useState([]);
    const [showMessage, setShowMessage] = useState(true);
    const defaultDate = 'February 1, 1';
    const columns = [
        {
            field: 'userId', headerName: 'Contributor', width: 200,
            valueGetter: (params) => {
                const userId = params.row.userId;
                return getUsername(userId);
            },
        },
        {
            field: 'isAdmin', headerName: 'Status', width: 100,
            valueGetter: (params) => {
                const status = params.row.isAdmin;
                return status ? 'Yes' : 'No';
            },
        },
        {
            field: 'dateAdded', headerName: 'Date Joined', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateAdded;
                const formattedAddedDate = formatDate(date, true);
                return formattedAddedDate === defaultDate ? '' : formattedAddedDate;
            },
        },
        {
            field: 'dateRemoved', headerName: 'Date Removed', width: 200,
            valueGetter: (params) => {
                const date = params.row.dateRemoved;
                const formattedUpdatedDate = formatDate(date);
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

    useEffect(() => {
        FetchUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    useEffect(() => {
        setData(dataRow);
    });

    useEffect(() => {
        if (selectedGroup) {
            const id = selectedGroup.id;
            if (id) {
                setShowMessage(false);
                FetchMembersByGroupId(id)
                    .then(response => {
                        console.log(response);
                        setDataRow(response);
                    });
            }
            else
                setShowMessage(true);
        }
    }, [selectedGroup]);

    function getUsername(userId) {
        if (!userId) {
            return;
        }
        const foundUser = users.find(user => user.id === userId);
        return foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : '';
    }

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
        <div style={{ height: showMessage? 100: 400, width: '100%' }}>
            {
                showMessage?
                    <Alert variant="filled" severity="info">
                        Select a group first to view list of members of that group - check it out!
                    </Alert>
                    :
                    <DataGrid
                        rows={dataRow}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 50, 100]}
                        disableSelectionOnClick={true}
                        slots={{ toolbar: GridToolbar }} 
                    />
            }
        </div>
    );
}