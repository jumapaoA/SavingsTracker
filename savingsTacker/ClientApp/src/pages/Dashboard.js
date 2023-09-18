import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

import {
    FetchUsers, FetchUserById, FetchUserBySavingsId, FetchMembersByGroupId, UpdateUserProfile, UpdateUserStatus,
    UpdateUserProfilePicture, FetchSavings, FetchSavingsByUserId, FetchSavingsBySavingId, FetchSavingsByGroupId,
    FetchGroupSavingsByUserId, CreateSaving, UpdateSavings, FetchGroups, FetchGroupDetailByGroupId, FetchGroupsByUserId,
    FetchGroupSavingsById, CreateGroup, CreateGroupMember, CreateGroupSavings, UpdateGroup, UpdateAdminMember,
    UpdateMemberStatus, FetchActivityLog } from '../axios/fetch-api';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function testAPICall() {
    const userId = "a0cf219d-6bdb-444f-8013-76a7fd4c4fa1";
    const intIDs = 1;

    FetchUsers();
    FetchUserById(userId);
    FetchUserBySavingsId(intIDs);
    FetchMembersByGroupId(intIDs);
    //UpdateUserProfile(userId);
    //UpdateUserStatus(userId);
    //UpdateUserProfilePicture(userId);

    FetchSavings();
    FetchSavingsByUserId(userId);
    FetchSavingsBySavingId(intIDs);
    FetchSavingsByGroupId(intIDs);
    FetchGroupSavingsByUserId(userId);
    //CreateSaving();
    ///UpdateSavings(intIDs);

    FetchGroups();
    FetchGroupDetailByGroupId(intIDs);
    FetchGroupsByUserId(userId);
    FetchGroupSavingsById(intIDs);
    //CreateGroup();
    //CreateGroupMember(userId);
    //CreateGroupSavings(userId);
   // UpdateGroup(userId);
    //UpdateAdminMember(userId);
    //UpdateMemberStatus(userId);

    FetchActivityLog(userId);
}

export default function Dashboard() {

    testAPICall();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Chart />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Deposits />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Orders />
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
}
