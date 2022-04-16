//useState() creates a local state and preserves it between the render cycles, giving you one of the biggest advantages of declaring a class component without having to actually declare it
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from "react-bootstrap";

import "./login-view.scss"

import axios from 'axios';


// Create LoginView as function component using Hooks
export function LoginView(props) {
    // Call useState method from React to initialize login variables with an empty value
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();    //// prevent default submit button behaviour, i.e., don't reload the page

        /* Send a request to the server for authentication */
        axios.post('https://myflixs.herokuapp.com/login', {
            Username: username, //POST request is made to the login endpoint by passing the username and password.
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data); /* if there's a match then call props.onLoggedIn(data i.e.username,password and token) */
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};