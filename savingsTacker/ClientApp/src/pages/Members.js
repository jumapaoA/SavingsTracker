import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container } from 'reactstrap';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';

import { UserId, FetchSavingsByUserId, FetchMembersByGroupId, CreateGroupMember, UpdateMemberStatus, FetchUsers, CreateGroupSavings, FetchGroupsByUserId, FetchSavingsByGroupId, CreateSaving, UpdateSavings, FetchGroupBySavingsId, UpdateGroupSavings, UpdateAdminMember } from '../axios/fetch-api';

export default function Members() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [members, setMembers] = useState([]);
    const [showMessage, setShowMessage] = useState(true);
    const [totalMembers, setTotalMembers] = useState(0);
    const [addIsClick, setAddIsClick] = useState(false);
    const [rowIsClick, setRowIsClick] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const [nonMembers, setNonMembers] = useState([]);
    const defaultDate = 'January 1, 1';
    const columns = [
        {
            field: 'userId', headerName: 'Name', width: 200,
            valueGetter: (params) => {
                const userId = params.row.userId;
                return getUsername(userId);
            },
        },
        {
            field: 'isAdmin', headerName: 'Admin', width: 100,
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
        UserId()
            .then(response => {
                setUserId(response.sub)
            });
        FetchUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    useEffect(() => {
        console.log("count: " + userId);
        if (userId) {
            FetchGroupsByUserId(userId).then(response => setGroups(response));
        }

    }, [userId]);

    useEffect(() => {
        console.log(selectedGroup);
        if (selectedGroup) {
            const id = selectedGroup.id;
            if (id) {
                setShowMessage(false);
                getMembers();
            }
            else {
                setShowMessage(true);
                setTotalMembers(0);
            }
        }
    }, [selectedGroup]);

    useEffect(() => {
        const non_Members = users.filter(user => !members.some(member => member.userId === user.id));
        setNonMembers(non_Members);
    }, [members, users]);

    useEffect(() => {
        if (rowIsClick) {
            console.log(selectedRow);
            Swal.fire({
                icon: 'question',
                title: 'What action?',
                text: `Set member status to ${selectedRow.isActive ? 'Inactive' : 'Active'}${selectedRow.isAdmin? '?':' or add as admin?'}`,
                showDenyButton: !selectedRow.isAdmin,
                showCancelButton: true,
                confirmButtonText: 'Update status',
                denyButtonText: `Make admin`,
            })
                .then((result) => {
                    const form = new FormData();
                    form.append('UserId', userId);
                    if (result.isConfirmed) {
                        form.append('IsActive', !selectedRow.isActive);
                        UpdateMemberStatus(selectedRow.id, form).then(getMembers());
                        Swal.fire('Status updated!', '', 'success')
                    }
                    else if (result.isDenied) {
                        form.append('IsAdmin', true);
                        UpdateAdminMember(selectedRow.id, form).then(getMembers());
                        Swal.fire(`Updated to admin!`, '', 'success')
                    }
                })
            setRowIsClick(false);
        }
    }, [rowIsClick]);

    function getMembers() {
        FetchMembersByGroupId(selectedGroup.id)
            .then(response => {
                console.log(response);
                setMembers(response);
                setTotalMembers(response.length);
            });
    }

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
        const mm = months[date.getMonth()];
        const dd = date.getDate();
        const yyyy = date.getFullYear();
        const stringDate = `${mm} ${dd}, ${yyyy}`;

        return stringDate;
    }

    function onGroupChange(newValue) {
        if (newValue) {
            const selectedGroupObject = groups.find(group => group.groupName === newValue);
            setSelectedGroup(selectedGroupObject);
        }
        else {
            setSelectedGroup([]);
        }
    }

    function onOpenAddForm() {
        setAddIsClick(true);
    }

    function onCloseAddForm() {
        getMembers();
        setAddIsClick(false);
    }


    return (
        <div>
            <div className="flex-column">
                <div className="dashboard-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
                    <h2 style={{ margin: '1em' }}>Members</h2>
                    <Paper
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}
                        sx={{ height: 110, width: 170, }}>
                        <div>
                            <h6 style={{ padding: '10px' }}>Total Members</h6>
                        </div>
                        <div style={{ alignSelf: 'center' }}>
                            <h4>{totalMembers}</h4>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: '3px' }} >
                            <IconButton aria-label="add savings" disabled={showMessage} onClick={() => onOpenAddForm()} color="primary" title="Add Savings" style={{ top: '-15px' }} >
                                <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            {addIsClick && <AddDialog open={addIsClick} setOpen={() => onCloseAddForm()} groupId={selectedGroup.id} nonMembers={nonMembers} />}
                        </div>
                    </Paper>
                </div>

                <div style={{ backgroundColor: '#F4F4F4' }}>
                    <Container style={{ marginBottom: '1.5em' }}>
                        <p style={{ height: '5px' }}></p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px', marginBottom: '10px', marginLeft: '15em' }}>
                                <div style={{ flex: '60%' }} />
                                <div style={{ flex: '40%' }}>
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
                        <div style={{ height: showMessage ? 200 : 400, width: '100%' }}>
                            {
                                showMessage ?
                                    <Alert variant="filled" severity="info">
                                        Select a group first to view list of members of that group - check it out!
                                    </Alert>
                                    :
                                    <DataGrid
                                        rows={members}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10, 50]}
                                        onRowClick={(params) => {
                                            setSelectedRow(params.row);
                                            setRowIsClick(true);
                                        }}
                                    />
                            }
                        </div>
                        {/*{rowIsClick && <EditMemberDialog open={rowIsClick} setOpen={onClose} row={selectedRow} username={getUsername(selectedRow.userId)} />} */}
                    </Container>
                </div>
            </div>
        </div>
    );
}

export function AddDialog({ open, setOpen, groupId, nonMembers }) {
    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState('');
    console.log(groupId);
    function onChange(event) {
        const value = event.target.value;
        console.log(value);
        setUser(value);
        setUsername(`${value.firstName} ${value.lastName}`);
    }

    function addMember() {
        console.log(user.id);
        const form = new FormData();
        form.append('UserId', user.id);
        form.append('IsAdmin', false);
        
        CreateGroupMember(groupId, form);
        setOpen();
    }

    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogTitle>Member Form</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Stack component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' } }} noValidate autoComplete="off" >
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select
                            width='100%'
                            value={user}
                            onChange={(event) => onChange(event)}
                            label="Age"
                        >
                            {
                                nonMembers.map(user => {
                                    return <MenuItem key={user.id} value={user}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={setOpen}>Cancel</Button>
                <Button onClick={addMember} disabled={!username}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
