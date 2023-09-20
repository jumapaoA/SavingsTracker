import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavMenu from './NavMenu';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function Layout({ children }) {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavMenu/>
                <Box style={{ marginTop: '75px', marginLeft: '20px', flex: 1, marginRight: '20px' }}>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}