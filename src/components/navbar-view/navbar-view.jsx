import React from "react";
import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';


export function NavbarView({ user }) {

    //const onLoggedOut = () => {
    //  localStorage.clear();
    //window.open('/', '_self');
    //};

    return (
        <Container id="navbar-container">
            <Navbar id="navbar" static="top">

                <Navbar.Brand id="navbar-brand" href="/">myFlix</Navbar.Brand>
                <Nav id="nav" className="me-auto">
                    <Nav.Link id="nav-link" href="/profile">Profile</Nav.Link>
                    <Nav.Link id="nav-link" href="#">Watchlist</Nav.Link>
                </Nav>
            </Navbar>
        </Container>


    )
}