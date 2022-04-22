//useState() creates a local state and preserves it between the render cycles, giving you one of the biggest advantages of declaring a class component without having to actually declare it
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

// Create LoginView as function component using Hooks
export function LoginView(props) {
    const [username, setUsername] = useState(''); // Call useState method from React to initialize login variables with an empty value
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();  // prevent default submit button behaviour, i.e., don't reload the page
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
        //<div><br />
        //  <span>Need to create an account?</span><br />
        // <button type="submit">Register Here</button>
        //</div></>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};

//export default LoginView;






