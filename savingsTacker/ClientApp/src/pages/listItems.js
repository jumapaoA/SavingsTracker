import React, { useEffect, useState} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SavingsIcon from '@mui/icons-material/Savings';
import List from '@mui/material/List';

export function MainListItems() {
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const currentURL = window.location.pathname;
        setActiveTab(currentURL);
    }, []);

    return (
        <List component="nav">
            <ListItemButton href='/' style={{ backgroundColor: activeTab === "/" ? '#673ab7b3' : '', color: activeTab === "/" ? '#ffff' : 'black' }}>
                <ListItemIcon>
                    <DashboardIcon style={{ color: activeTab === "/" ? "white": ""}} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton href='/saving' style={{ backgroundColor: activeTab === "/saving" ? '#673ab7b3' : '', color: activeTab === "/saving" ? '#ffff' : 'black' }}>
                <ListItemIcon>
                    <SavingsIcon style={{ color: activeTab === "/saving" ? "white" : "" }} />
                </ListItemIcon>
                <ListItemText primary="Savings" />
            </ListItemButton>
            <ListItemButton href='/contributor' style={{ backgroundColor: activeTab === "/contributor" ? '#673ab7b3' : '', color: activeTab === "/contributor" ? '#ffff' : 'black' }}>
                <ListItemIcon>
                    <PeopleIcon style={{ color: activeTab === "/contributor" ? "white" : "" }} />
                </ListItemIcon>
                <ListItemText primary="Groups" />
            </ListItemButton>
            <ListItemButton href='/member' style={{ backgroundColor: activeTab === "/member" ? '#673ab7b3' : '', color: activeTab === "/member" ? '#ffff' : 'black' }}>
                <ListItemIcon>
                    <GroupAddIcon style={{ color: activeTab === "/member" ? "white" : "" }} />
                </ListItemIcon>
                <ListItemText primary="Members" />
            </ListItemButton>
            <ListItemButton href='/reports' style={{ backgroundColor: activeTab === "/reports" ? '#673ab7b3' : '', color: activeTab === "/reports" ? '#ffff' : 'black' }}>
                <ListItemIcon>
                    <BarChartIcon style={{ color: activeTab === "/reports" ? "white" : "" }} />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton href='/activities' style={{ backgroundColor: activeTab === "/activities" ? '#673ab7b3' : '', color: activeTab === "/activities" ? '#ffff' : 'black' }}>
                <ListItemIcon>
                    <AssignmentIcon style={{ color: activeTab === "/activities" ? "white" : "" }} />
                </ListItemIcon>
                <ListItemText primary="Activity Log" />
            </ListItemButton>
        </List>
    );
};

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);
