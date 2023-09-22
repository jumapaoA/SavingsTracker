import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LoginMenu } from './api-authorization/LoginMenu';
import { mainListItems, secondaryListItems } from '../pages/listItems';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function MavMenu({ children }) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar sx={{ pr: '24px', }} >
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
                        <a href="/" style={{ color: 'white', textDecoration:'none' }}>Savings Tracker</a>
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <LoginMenu>
                    </LoginMenu>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    {/*<Divider sx={{ my: 1 }} />*/}
                    {/*{secondaryListItems}*/}
                </List>
            </Drawer>
        </>
    );
}


//return (
        //    <>
        //        {/* logo & toggler button */}
        //        <Box
        //            sx={{
        //                width: 228,
        //                display: 'flex',
        //                [theme.breakpoints.down('md')]: {
        //                    width: 'auto'
        //                }
        //            }}
        //        >
        //            <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
        //                <NotificationsIcon />
        //            </Box>
        //            <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        //                <Avatar
        //                    variant="rounded"
        //                    sx={{
        //                        ...theme.typography.commonAvatar,
        //                        ...theme.typography.mediumAvatar,
        //                        transition: 'all .2s ease-in-out',
        //                        background: theme.palette.secondary.light,
        //                        color: theme.palette.secondary.dark,
        //                        '&:hover': {
        //                            background: theme.palette.secondary.dark,
        //                            color: theme.palette.secondary.light
        //                        }
        //                    }}
        //                    onClick={handleLeftDrawerToggle}
        //                    color="inherit"
        //                >
        //                    <ChevronLeftIcon stroke={1.5} size="1.3rem" />
        //                </Avatar>
        //            </ButtonBase>
        //        </Box>

        //        {/* header search */}

        //    </>
        //);