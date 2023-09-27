import React, { Component, Fragment, useState } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

import { FetchUserNameById } from '../../axios/fetch-api';

export class LoginMenu extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null,
            user: [],
            userFullname: ""
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name,
            user: user
        });
        FetchUserNameById(user.sub).then(response => {
            this.setState({
                userFullname: response
            });
        });
    }

    render() {
        const { isAuthenticated, userName, user, userFullname } = this.state;

        
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = `${ApplicationPaths.LogOut}`;
            const logoutState = { local: true };
            return this.authenticatedView(profilePath, logoutPath, userFullname, logoutState);
        }
    }

    authenticatedView(profilePath, logoutPath, userFullname, logoutState) {
        console.log(userFullname);

        return (<Fragment>
            <NavItem style={{ listStyleType: 'none', marginLeft: '10px', marginRight: '10px' }}>
                <NavLink tag={Link} className="text-light" to={profilePath} title='Profile'>{userFullname}</NavLink>
            </NavItem>
            <NavItem style={{ listStyleType: 'none' }}>
                <NavLink replace tag={Link} className="text-light" to={logoutPath} state={logoutState}>Logout</NavLink>
            </NavItem>
        </Fragment>);
    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem style={{ listStyleType: 'none', marginLeft:'10px', marginRight:'10px' }}>
                <NavLink tag={Link} className="text-light" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem style={{ listStyleType: 'none' }}>
                <NavLink tag={Link} className="text-light" to={loginPath}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }
}
