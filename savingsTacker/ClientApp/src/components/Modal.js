import Swal from 'sweetalert2';
import React from 'react';

import { ApplicationPaths } from '../components/api-authorization/ApiAuthorizationConstants';

export function UnsuccessModal() {

    function justModal() {
        Swal.fire({
            icon: 'Error',
            title: 'Something must have gone wrong...',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return justModal();
}


export function SuccessModal() {
    //const handleLogout = () => {
    //    const logoutPath = ApplicationPaths.LogOut; // Replace with your logout path
    //    const logoutState = { local: true };

    //    // Create a function to redirect to the logout path
    //    const redirectToLogout = () => {
    //        window.history.state.usr = logoutState;
    //        window.location.href = `${logoutPath}`;
    //    };

    //    // Call the redirection function
    //    redirectToLogout();
    //};
    const handleLogout = () => {
        const logoutPath = ApplicationPaths.LogOut; // Replace with your logout path
        const logoutState = { local: true };

        // Check if window.history.state is defined before accessing it
        if (window.history.state && window.history.state.usr) {
            window.history.state.usr.local = logoutState.local;
        } else {
            // If window.history.state or usr is not defined, set it with the desired state
            window.history.replaceState({ usr: { local: logoutState.local } }, null, logoutPath);
        }

        // Redirect to the logout path
        window.location.href = logoutPath;
    };

    return (
        <>
            {handleLogout()}
        </>
    );
}
