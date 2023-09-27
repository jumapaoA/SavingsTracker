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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import Stack from '@mui/material/Stack';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Swal from 'sweetalert2';

import { UserId, FetchSavingsByUserId, FetchUsers, CreateGroupSavings, FetchGroupsByUserId, FetchSavingsByGroupId, CreateSaving, UpdateSavings, FetchGroupBySavingsId, UpdateGroupSavings } from '../axios/fetch-api';

export default function Orders() {
    const [savings, setSavings] = useState([]);
    const [dataRow, setDataRow] = useState([]);
    const [groups, setGroups] = useState([]);
    const [addIsClick, setAddIsClick] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowIsClick, setRowIsClick] = useState(false);
    const [totalSavings, setTotalSavings] = useState(0);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        UserId()
            .then(response => {
                setUserId(response.sub)
                console.log(response);
            });
    }, []);

    useEffect(() => {
        console.log("count: "+userId);
        if (userId) {
            FetchSavingsByUserId(userId)
                .then(response => {
                    const filtered = response.filter(item => item.isActive);
                    setSavings(filtered);
                    setDataRow(filtered);
                });

            FetchGroupsByUserId(userId).then(response => setGroups(response));
        }
        
    }, [userId]);

    useEffect(() => {
        console.log(selectedGroup);
        if (selectedGroup) {
            const id = selectedGroup.id;
            if (id) {
                FetchSavingsByGroupId(id)
                    .then((response) => {
                        const filtered = response.filter(item => item.isActive);
                        setDataRow(filtered);
                    });
            }
            else {
                setDataRow(savings);
            }
        }
        else
            setDataRow(savings);

    }, [selectedGroup]);

    useEffect(() => {
        getTotalSavings();
    }, [dataRow]);

    function getTotalSavings() {
        if (dataRow) {
            const calculatedTotalSavings = dataRow.reduce((total, item) => total + item.amount, 0);
            setTotalSavings(calculatedTotalSavings);
        }
    }

    function onOpenAddForm() {
        setAddIsClick(true);
    }

    function onCloseAddForm() {
        setAddIsClick(false);
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

    function withdrawAll() {
        console.log(dataRow.length);
        if (dataRow.length === 0) {
            return;
        }

        Swal.fire({
            title: 'Withdraw savings?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                for (let i = 0; i < dataRow.length; i++) {
                    const currentItem = dataRow[i];
                    console.log(currentItem);

                    const form = new FormData();
                    form.append('UserId', currentItem.userId);
                    form.append('Amount', currentItem.amount);
                    form.append('IsActive', false);
                    form.append('Description', currentItem.description);

                    UpdateSavings(currentItem.id, form);
                }
                defaultStatus();

                Swal.fire({
                    title: 'Withdrawing...',
                    html: 'Removing your savings.',
                    timer: 1500,
                    timerProgressBar: true
                })
            }
        })
        
    }

    function rowOnClick() {
        setRowIsClick(true);
    }

    function onClose() {
        setRowIsClick(false);
    };

    function defaultStatus() {
        setDataRow(savings);
        setSelectedGroup([]);
    }

    return (
        <div>
            <div className="flex-column">
                <div className="dashboard-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', width:'100%' }}>
                    <h2 style={{ margin: '1em' }}>Savings</h2>
                    <Paper
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}
                        sx={{ height: 110, width: 170, }}>
                        <div>
                            <h6 style={{ padding: '10px' }}>Total savings</h6>
                        </div>
                        <div style={{ alignSelf: 'center' }}>
                            <h4>₱{totalSavings}</h4>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: '3px' }} >
                            <IconButton aria-label="add savings" onClick={() => onOpenAddForm()} color="primary" title="Add Savings" style={{ top: '-15px' }} >
                                <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            {addIsClick && <AddDialog open={addIsClick} setOpen={() => onCloseAddForm()} userId={userId} />}
                        </div>
                    </Paper>
                </div>

                <div style={{ backgroundColor: '#F4F4F4' }}>
                    <Container style={{ marginBottom: '1.5em'}}>
                        <p style={{ height: '5px' }}></p>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px', marginBottom: '10px' }}>
                            <div style={{ flex: '65%', padding: '5px' }}>
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
                            {/*<div style={{ flex: '2%' }} />*/}
                            <div style={{ flex: '30%', padding: '5px' }}>
                                <Autocomplete
                                    value={selectedGroup.length === 0? '':selectedGroup.groupName}
                                    onChange={(event, newValue) => {
                                        onGroupChange(newValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={groups.map(group => group.groupName)}
                                    renderInput={(params) => <TextField {...params} label="Group" />}
                                />
                            </div>
                        </div>
                        < Button variant="outlined" startIcon={<LocalAtmIcon />} onClick={() => withdrawAll()} disabled={dataRow.length === 0}>Withdraw All</Button> 
                        <p style={{ height: '0.1px' }}></p>
                        <SavingsTable rows={dataRow} setSelectedRow={setSelectedRow} setRowIsClick={rowOnClick} />
                        {rowIsClick && <EditSavingsDialog open={rowIsClick} setOpen={onClose} row={selectedRow} setRowIsClick={rowOnClick} userId={userId} groups={groups} />} 
                    </Container>
                </div>
            </div>
        </div>
    );
}

export function SavingsTable({ rows, setSelectedRow, setRowIsClick }) {
    const [users, setUsers] = useState([]);
    const defaultDate = 'January 1, 1';
    const columns = [
        //{
        //    field: 'userId', headerName: 'Contributor', width: 150,
        //    valueGetter: (params) => {
        //        const userId = params.row.userId;
        //        return getUsername(userId);
        //    },
        //},
        {
            field: 'dateContributed', headerName: 'Date Contributed', width: 150,
            valueGetter: (params) => {
                const date = params.row.dateContributed;
                const formattedAddedDate = formatDate(date, true);
                return formattedAddedDate === defaultDate ? '' : formattedAddedDate;
            },
        },
        {
            field: 'amount', headerName: 'Amount', type: 'number', width: 120 ,
            valueGetter: (params) => {
                const value = params.row.amount;
                return `₱${value}`;
            },
        },
        {
            field: 'description', headerName: 'Description', width: 200,
        },
        {
            field: 'userUpdated', headerName: 'Updated By', width: 150,
            valueGetter: (params) => {
                const userId = params.row.userUpdated;
                return getUsername(userId);
            },
        },
        {
            field: 'dateUpdated', headerName: 'Date Updated', width: 150,
            valueGetter: (params) => {
                const date = params.row.dateUpdated;
                const formattedUpdatedDate =  formatDate(date);
                return formattedUpdatedDate === defaultDate ? '' : formattedUpdatedDate;
            },
        },
    ];

    useEffect(() => {
        FetchUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    function getUsername(userId) {
        if (!userId) {
            return;
        }
        const foundUser = users.find(user => user.id === userId);
        return foundUser? `${foundUser.firstName} ${foundUser.lastName}`: '';
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

export function AddDialog({ open, setOpen, userId }) {

    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [amount, setAmount] = useState(0);
    const [amountInvalid, setAmountInvalid] = useState(false);
    const [formLacking, setFormLacking] = useState(true);
    const [description, setDescription] = useState('');
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);

    useEffect(() => {
        FetchGroupsByUserId(userId).then(response => setGroups(response));
    }, []);

    useEffect(() => {
        console.log(amountInvalid);
        console.log(descriptionInvalid);
        console.log(amount);
        console.log(description);
        if ((amountInvalid || descriptionInvalid) || amount === '0' || amount === '' || description === '')
            setFormLacking(true);
        else
            setFormLacking(false);
    }, [amountInvalid, descriptionInvalid]);

    function onGroupChange(newValue) {
        if (newValue) {
            const selectedGroupObject = groups.find(group => group.groupName === newValue);
            setSelectedGroup(selectedGroupObject);
        }
        else {
            setSelectedGroup([]);
        }
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
        form.append('UserId', userId);
        form.append('Amount', amount);
        form.append('Description', description);
        console.log(amount);


        if (selectedGroup) {
            CreateGroupSavings(selectedGroup.id, form)
                .then(
                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                );
        }
        else {
            CreateSaving(form)
                .then(
                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                );
        }

        setOpen();
    }

    function onClickAmount() {
        if (amount === 0) {
            setAmount('');
            setAmountInvalid(true);
        }
    }

    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogTitle>Savings Form</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
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
                        value={selectedGroup.groupName}
                        onChange={(event, newValue) => {

                            onGroupChange(newValue);
                        }}
                        id="controllable-states-demo"
                        options={groups.map(group => group.groupName)}
                        renderInput={(params) => <TextField {...params} label="Group" />}
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

export function EditSavingsDialog({ open, setOpen, row, userId, groups }) {

    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [amount, setAmount] = useState(row.amount);
    const [amountInvalid, setAmountInvalid] = useState(false);
    const [formLacking, setFormLacking] = useState(true);
    const [description, setDescription] = useState(row.description);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        console.log(row.id);
        FetchGroupBySavingsId(row.id)
            .then(response => {
                console.log(response);
                if (response !== null) {
                    setSelectedGroup(response);
                    setGroupName(response.groupName);
                }
            });
        
    }, []);

    useEffect(() => {
        if ((amountInvalid || descriptionInvalid) || amount === '0' || amount === '' || description === '')
            setFormLacking(true);
        else
            setFormLacking(false);
    }, [amountInvalid, descriptionInvalid]);

    function updateSavings(active) {
        row.amount = amount;
        const form = new FormData();
        form.append('UserId', userId);
        form.append('Amount', amount);
        form.append('IsActive', active);
        form.append('Description', description);

        console.log(groupName);
        if (groupName) {
            console.log("inside if: selectedgroup is not null");
            form.append('GroupId', selectedGroup.id);
            UpdateGroupSavings(row.id, form).then(
                Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    showConfirmButton: false,
                    timer: 1500
                })
            );
        }
        else {
            console.log("inside else, selectedgroup is null");
            UpdateSavings(row.id, form)
                .then(
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                );
        }

        setOpen();
    }

    function onClickAmount() {
        if (amount === 0) {
            setAmount('');
            setFormLacking(true);
        }
    }

    function onClose() {
        setAmountInvalid(false);
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
                    updateSavings(false);
                    Swal.fire('Saved!', '', 'success')
                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
    }

    function onGroupChange(newValue) {
        if (newValue) {
            console.log(newValue);
            const selectedGroupObject = groups.find(group => group.groupName === newValue);
            setSelectedGroup(selectedGroupObject);
            setGroupName(newValue);
        }
        else {
            setSelectedGroup([]);
        }
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Savings Form</label>
                    <IconButton aria-label="delete savings" onClick={onDelete} color="warning" title="Delete savings" >
                        <AutoDeleteOutlinedIcon />
                    </IconButton>
                    
                </div>
            </DialogTitle>
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
                        value={groupName}
                        onChange={(event, newValue) => {
                            onGroupChange(newValue);
                        }}
                        id="controllable-states-demo"
                        options={groups.map(group => group.groupName)}
                        renderInput={(params) => <TextField {...params} label="Group" />}
                    />
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={()=>updateSavings(true)} disabled={formLacking}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}
