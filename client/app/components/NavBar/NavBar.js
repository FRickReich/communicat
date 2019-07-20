import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavBar extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {

        };
    }

    logOut()
    {
        localStorage.removeItem('userToken');
        this.props.history.push('/');
    }

    render()
    {
        return (
            <div>
                <span>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/profile">Profile</Link>&nbsp;
                    <Link to="/dashboard">Dashboard</Link>&nbsp;
                    <Link to="/login">Login</Link>&nbsp;
                    <a href="" onClick={ this.logOut }>Logout</a>
                </span>
            </div>
        );
    }
}

export default NavBar;