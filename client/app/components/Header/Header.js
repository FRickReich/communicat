'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends Component
{
    constructor(props) 
    {
        super(props);
    }

    render() {
        return (
            <>
                <Navbar bg="light">
                    <Navbar.Brand href="#home">
                        <img
                            src="/assets/img/logo.png"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Racing Games Matter logo"
                        />
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        );
    }
}

export default Header;
