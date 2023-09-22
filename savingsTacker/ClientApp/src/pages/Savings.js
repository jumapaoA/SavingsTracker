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
import Box from '@mui/material/Box';
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import Swal from 'sweetalert2';

import { FetchSavingsByUserId, FetchUsers, FetchGroupsByUserId, FetchSavingsByGroupId, CreateSaving, UpdateSavings } from '../axios/fetch-api';

const userId = "a0cf219d-6bdb-444f-8013-76a7fd4c4fa1";
//const userId = "ab8ebde1-5431-42e0-9db0-ba001529ca1f";

export default function Orders() {
    const [savings, setSavings] = useState([]);
    const [dataRow, setDataRow] = useState([]);
    const [groups, setGroups] = useState([]);
    const [addIsClick, setAddIsClick] = useState(false);
    const [selectedGroup, setSelectedGroup] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [rowIsClick, setRowIsClick] = useState(false);
    const [totalSavings, setTotalSavings] = useState(0);

    useEffect(() => {
        FetchSavingsByUserId(userId)
            .then(response => {
                setSavings(response);
                setDataRow(response);
            });

        FetchGroupsByUserId(userId).then(response => setGroups(response));
    }, []);

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

    useEffect(() => {
        getTotalSavings();
    }, [dataRow]);

    useEffect(() => {
        console.log(totalSavings);
    }, [totalSavings]);

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

    function rowOnClick() {
        setRowIsClick(true);
    }

    function onClose() {
        setRowIsClick(false);
    };

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
                            <h4>₱{totalSavings}</h4>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: '3px' }} >
                            <IconButton aria-label="add savings" onClick={() => onOpenAddForm()} color="primary" title="Add Savings" style={{ top: '-15px' }} >
                                <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            {addIsClick && <AddDialog open={addIsClick} setOpen={()=>onCloseAddForm()} />}
                        </div>
                    </Paper>
                </div>

                <div style={{ backgroundColor: '#F4F4F4' }}>
                    <Container style={{ marginBottom: '1.5em' }}>
                        <p style={{ height: '5px' }}></p>

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
                        <SavingsTable rows={dataRow} setSelectedRow={setSelectedRow} setRowIsClick={rowOnClick} />
                        {rowIsClick && <EditSavingsDialog open={rowIsClick} setOpen={onClose} row={selectedRow} setRowIsClick={rowOnClick} />} 
                    </Container>
                </div>
            </div>
        </div>
    );
}

export function SavingsTable({ rows, setSelectedRow, setRowIsClick }) {
    const [users, setUsers] = useState([]);
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
            field: 'amount', headerName: 'Amount', type: 'number', width: 100 ,
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
                return formattedAddedDate === defaultDate ? '': formattedAddedDate;
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
                const formattedUpdatedDate =  formatDate(date);
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
                onRowClick={(params) => {
                    setSelectedRow(params.row);
                    setRowIsClick();
                }}
            />
        </div>
    );
}

export function AddDialog({ open, setOpen }) {

    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [amount, setAmount] = useState(0);
    const [amountInvalid, setAmountInvalid] = useState(false);
    const [formLacking, setFormLacking] = useState(true);

    function amountOnChange(event) {
        const value = event.target.value;
        setAmount(value);

        if (value === "" || value === 0) {
            setAmountInvalid(true);
        }
        else {
            setAmountInvalid(false);
        }
    }

    function addSavings() {
        const form = new FormData();
        form.append('UserId', userId);
        form.append('Amount', amount);
        console.log(amount);

        CreateSaving(form).then(
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        );

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
                
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' } }} noValidate autoComplete="off" >
                    <div>
                        <TextField
                            error={amountInvalid}
                            label="Amount"
                            value={amount }
                            defaultValue="Hello World"
                            helperText={amountInvalid ? "Input a number.":""}
                            variant="standard"
                            onChange={(event) => amountOnChange(event)}
                            onClick={onClickAmount}
                            type="number"
                        />
                    </div>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={setOpen}>Cancel</Button>
                <Button onClick={addSavings} disabled={amount === 0 || amountInvalid}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export function EditSavingsDialog({ open, setOpen, row }) {

    //VARIABLES FOR INPUTED DATA AND VALIDATE IT
    const [amount, setAmount] = useState(row.amount);
    const [amountInvalid, setAmountInvalid] = useState(false);
    const [formLacking, setFormLacking] = useState(true);

    function amountOnChange(event) {
        const value = event.target.value;
        setAmount(value);
        console.log(value);
        console.log(row.amount+"");

        if (value === "" || value === 0) {
            setAmountInvalid(true);
            setFormLacking(true);
        }
        else {
            setAmountInvalid(false);
            setFormLacking(false);
        }

        if (value === `${row.amount}`)
            setFormLacking(true);
    }

    function updateSavings(active) {
        row.amount = amount;
        const form = new FormData();
        form.append('UserId', userId);
        form.append('Amount', amount);
        form.append('IsActive', active);
        
        UpdateSavings(row.id, form).then(
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                showConfirmButton: false,
                timer: 1500
            })
        );

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

                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' } }} noValidate autoComplete="off" >
                    <div>
                        <TextField
                            error={amountInvalid}
                            label="Amount"
                            value={amount}
                            helperText={amountInvalid ? "Input a number." : ""}
                            variant="standard"
                            onChange={(event) => amountOnChange(event)}
                            onClick={onClickAmount}
                            type="number"
                        />
                    </div>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={()=>updateSavings(true)} disabled={amountInvalid || formLacking}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}
