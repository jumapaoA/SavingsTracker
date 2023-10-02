import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Container } from 'reactstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';

import { UserId, UpdateGroup, CreateGroup, FetchGroupsByCreator, FetchGroupsByUserId, FetchMembersByGroupId, CreateGroupSavings, FetchUsers } from '../axios/fetch-api';

export default function Contributor() {
    const [groups, setGroups] = useState([]);
    const [addIsClick, setAddIsClick] = useState(false);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [rowIsClick, setRowIsClick] = useState(false);
    const [userId, setUserId] = useState("");
    const [dataRow, setDataRow] = useState([]);

    useEffect(() => {
        UserId()
            .then(response => {
                setUserId(response.sub)
                console.log(response);
            });
    }, []);

    useEffect(() => {
        if (userId)
            defaultStatus();
    }, [userId]);

    function onOpenAddForm() {
        setAddIsClick(true);
    }

    function onCloseAddForm() {
        defaultStatus();
        setAddIsClick(false);
    }

    function rowOnClick() {
        setRowIsClick(true);
    }

    function onClose() {
        defaultStatus();
        setRowIsClick(false);
    }

    function defaultStatus() {
        FetchGroupsByCreator(userId)
            .then(response => {
                const filteredResult = response.filter(item => item.isActive);
                setGroups(filteredResult);
                setDataRow(filteredResult);
            });
    }

    function filter(event) {
        const value = event.target.value;
        console.log(value);
        const filtered = groups.filter(item => `${item.groupName.toLowerCase()}`.includes(value.toLowerCase()));
        console.log(filtered);
        setDataRow(filtered);
    }

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
                            <IconButton aria-label="add group" onClick={() => onOpenAddForm()} color="primary" title="Add Groups" style={{ top: '-15px' }} >
                                <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            {addIsClick && <AddGroupDialog open={addIsClick} setOpen={() => onCloseAddForm()} userId={userId} />}
                        </div>
                    </Paper>
                </div>

                <div style={{ backgroundColor: '#F4F4F4' }}>
                    <Container style={{ marginBottom: '1.5em' }}>
                        <p style={{ height: '5px' }}></p>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom:'10px' }} >

                            <div style={{ width:'60%' }}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={filter}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            
                        </div>
                        <GroupsTable rows={dataRow} setSelectedRow={setSelectedRow} setRowIsClick={rowOnClick} />
                        {rowIsClick && <EditSavingsDialog open={rowIsClick} setOpen={onClose} row={selectedRow} setRowIsClick={rowOnClick} userId={userId} />}
                    </Container>
                </div>
            </div>
        </div>
    );
}

export function GroupsTable({ rows, setSelectedRow, setRowIsClick }) {
    const defaultDate = 'January 1, 1';
    const columns = [
        { field: 'groupName', headerName: 'Name', width: 200, },
        { field: 'groupDescription', headerName: 'Description', width: 200, },
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

    function formatDate(dateString) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date(dateString);
        const mm = months[date.getMonth()];
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
                onRowClick={(params) => {
                    setSelectedRow(params.row);
                    setRowIsClick();
                }}
            />
        </div>
    );
}

export function AddGroupDialog({ open, setOpen, userId }) {

    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameInvalid, setNameInvalid] = useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);
    const [formLacking, setFormLacking] = useState(true);
    const [groupExist, setGroupExist] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        FetchGroupsByUserId(userId)
            .then(response => {
                setGroups(response);
            });
    },[]);

    function onNameChange(event) {
        const value = event.target.value;
        const eventName = event.target.name;

        if (eventName === "name") {
            setName(value);
            const result = groups.find(group => group.groupName === value);
            console.log(result);
            if (result) {
                console.log(true);
                setGroupExist(true);
            }
            else {
                setGroupExist(false);
            }
        }
        else {
            setDescription(value);
        }

        if (value.length < 2) {
            eventName === "name" ? setNameInvalid(true) : setDescriptionInvalid(true);
        }
        else {
            setFormLacking(false);
            eventName === "name" ? setNameInvalid(false) : setDescriptionInvalid(false);
        }

    }

    function addGroup(active) {
        const form = new FormData();
        form.append('GroupName', name);
        form.append('GroupDescription', description);
        form.append('GroupCreator', userId);
        form.append('IsActive', active);

        CreateGroup(form).then(
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                showConfirmButton: false,
                timer: 1500
            })
        );

        setOpen();
    }

    function onClose() {
        setNameInvalid(false);
        setFormLacking(true);
        setOpen();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Group form</label>

                </div>
            </DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Stack component="form" sx={{ '& .MuiTextField-root': { width: '28ch' } }} spacing={2} noValidate autoComplete="off" >

                    <TextField
                        error={nameInvalid}
                        label="Group name"
                        name="name"
                        value={name}
                        helperText={nameInvalid ? "Enter atleast 2 characters." : ""}
                        variant="standard"
                        onChange={(event) => onNameChange(event)}
                    />
                    {groupExist && <p style={{ fontSize: '12px', color: 'red' }}>Name already exist.</p>}
                    <TextField
                        error={descriptionInvalid}
                        id="outlined-multiline-static"
                        label="Description"
                        name="description"
                        value={description}
                        helperText={descriptionInvalid ? "Enter atleast 2 characters." : ""}
                        multiline
                        rows={4}
                        placeholder="What is this group all about?"
                        onChange={(event) => onNameChange(event)}
                    />
                    {
                        nameInvalid || descriptionInvalid || groupExist ?
                            <Alert severity="warning" style={{ width: '250px' }}>Make sure to fill valid data.</Alert> :
                            <Alert severity="info" style={{ width: '250px' }}>Hit add to save changes.</Alert>
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => addGroup(true)} disabled={nameInvalid || groupExist || descriptionInvalid || formLacking}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export function EditSavingsDialog({ open, setOpen, row, userId }) {

    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [name, setName] = useState(row.groupName);
    const [description, setDescription] = useState(row.groupDescription);
    const [nameInvalid, setNameInvalid] = useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);
    const [formLacking, setFormLacking] = useState(true);
    const [addIsClick, setAddIsClick] = useState(false);
    const [groupExist, setGroupExist] = useState(false);
    const [groups, setGroups] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        FetchGroupsByUserId(userId)
            .then(response => {
                setGroups(response);
            });
        FetchMembersByGroupId(row.id)
            .then(response => {
                console.log(response);
                setMembers(response);
            });
    }, []);

    useEffect(() => {
        if (name === row.groupName && description === row.groupDescription)
            setFormLacking(true);
    }, [name, description]);

    function onNameChange(event) {
        const value = event.target.value;
        const eventName = event.target.name;

        if (eventName === "name") {
            setName(value);
            const result = groups.find(group => group.groupName === value);
            if (result) {
                setGroupExist(true);
            }
            else {
                setGroupExist(false);
            }
        }
        else {
            setDescription(value);
        }

        if (value.length < 2) {
            setFormLacking(true);
            eventName === "name" ? setNameInvalid(true) : setDescriptionInvalid(true) ;
        }
        else {
            setFormLacking(false);
            eventName === "name" ? setNameInvalid(false) : setDescriptionInvalid(false);
        }
    }

    function updateGroup(active) {
        row.groupName = name;
        const form = new FormData();
        form.append('GroupName', name);
        form.append('GroupDescription', description);
        form.append('IsActive', active);

        UpdateGroup(row.id, form).then(
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                showConfirmButton: false,
                timer: 1500
            })
        );

        setOpen();
    }

    function onClose() {
        setNameInvalid(false);
        setFormLacking(true);
        setOpen();
    }

    function onDelete() {
        onClose();

        Swal.fire({
            title: 'Do you want to delete this savings?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    updateGroup(false);
                    Swal.fire('Saved!', '', 'success')
                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
    }

    function onOpenAddForm() {
        setAddIsClick(true);
    }

    function onCloseAddForm() {
        setAddIsClick(false);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Savings Form</label>
                    <div>
                        <IconButton aria-label="delete group" onClick={onDelete} color="warning" title="Delete group" >
                            <AutoDeleteOutlinedIcon />
                        </IconButton>
                        <IconButton aria-label="add group" onClick={() => onOpenAddForm()} color="primary" title="Add Savings" >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                    {addIsClick && <AddDialog open={addIsClick} setOpen={() => onCloseAddForm()} userId={userId} members={members} group={row.id} />}
                </div>
            </DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Stack component="form" sx={{ '& .MuiTextField-root': { width: '28ch' } }} spacing={2} noValidate autoComplete="off" >
                    
                    <TextField
                        error={nameInvalid}
                        label="Group name"
                        name="name"
                        value={name}
                        helperText={nameInvalid ? "Enter atleast 2 characters." : ""}
                        variant="standard"
                        onChange={(event) => onNameChange(event)}
                    />
                    {groupExist && <p style={{ fontSize: '12px', color: 'red' }}>Name already exist.</p>}
                    <TextField
                        error={descriptionInvalid}
                        id="outlined-multiline-static"
                        label="Description"
                        name="description"
                        value={description}
                        helperText={descriptionInvalid ? "Enter atleast 2 characters." : ""}
                        multiline
                        rows={4}
                        placeholder="What is this group all about?"
                        onChange={(event) => onNameChange(event)}
                    />
                    {
                        formLacking || groupExist ?
                            <Alert severity="warning" style={{ width: '250px' }}>Make sure to fill all inputs.</Alert> :
                            <Alert severity="info" style={{width:'250px'} }>Hit update to save changes.</Alert>
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => updateGroup(true)} disabled={nameInvalid || descriptionInvalid || formLacking}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}

export function AddDialog({ open, setOpen, userId, members, group }) {

    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [amount, setAmount] = useState(0);
    const [amountInvalid, setAmountInvalid] = useState(false);
    const [formLacking, setFormLacking] = useState(true);
    const [description, setDescription] = useState('');
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);
    const [selectedMember, setSelectedMember] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        FetchUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    useEffect(() => {
        if ((amountInvalid || descriptionInvalid) || amount === '0' || amount === '' || description === '')
            setFormLacking(true);
        else
            setFormLacking(false);
    }, [amountInvalid, descriptionInvalid]);

    function getUsername(userId) {
        if (!userId) {
            return;
        }
        const foundUser = users.find(user => user.id === userId);
        return foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : '';
    }

    function onChange(event) {
        const value = event.target.value;
        const eventName = event.target.name;

        if (eventName === "amount") {
            setAmount(value);
            if (value === "0" || value === "")
                setAmountInvalid(true);
            else {
                setAmountInvalid(false);
            }
        }
        else {
            setDescription(value);
            if (value.length < 2)
                setDescriptionInvalid(true);
            else {
                setDescriptionInvalid(false);
            }
        }
    }

    function addSavings() {
        const form = new FormData();
        console.log(selectedMember.id);
        form.append('UserId', selectedMember.id);
        form.append('Amount', amount);
        form.append('Description', description);

        CreateGroupSavings(group, form)
            .then(() => {
                setOpen();
                Swal.fire({
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })  
            }
        );

        
    }

    function onClickAmount() {
        if (amount === 0) {
            setAmount('');
            setAmountInvalid(true);
        }
    }

    function onMemberChange(value) {
        console.log(value);
        if (value) {
            const selected = users.find(user => `${user.firstName} ${user.lastName}` === value);
            console.log(selected);
            setSelectedMember(selected);
        }
    }

    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogTitle>Savings Form</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Stack component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' } }} noValidate autoComplete="off" >
                    <TextField
                        error={amountInvalid}
                        label="Amount"
                        name="amount"
                        value={amount}
                        helperText={amountInvalid ? "Input a number." : ""}
                        variant="standard"
                        onChange={(event) => onChange(event)}
                        onClick={onClickAmount}
                        type="number"
                    />
                    <TextField
                        error={descriptionInvalid}
                        id="outlined-multiline-static"
                        label="Description"
                        name="description"
                        value={description}
                        helperText={descriptionInvalid ? "Enter atleast 2 characters." : ""}
                        multiline
                        rows={4}
                        placeholder="What is this group all about?"
                        onChange={(event) => onChange(event)}
                    />
                    <Autocomplete
                        value={selectedMember.userId}
                        onChange={(event, newValue) => {
                            onMemberChange(newValue);
                        }}
                        id="controllable-states-demo"
                        options={members.map(member => getUsername(member.userId))}
                        renderInput={(params) => <TextField {...params} label="Members" />}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={setOpen}>Cancel</Button>
                <Button onClick={addSavings} disabled={formLacking}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}