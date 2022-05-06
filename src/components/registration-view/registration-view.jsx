import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss'


// Create RegistrationView as function component using Hooks
export function RegistrationView(props) {
    // Call useState method from React to initialize registration variables with an empty value
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    //validation declarations-Declare a useState hook for the username, password & email that returns a pair of values [usernameErr, setUsernameErr] and pass an empty string as an argument.
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    // Sending request to server for authentication
    const validate = () => { //Create a function that returns whether the variable isReq is true or false. After declaring the variable isReq and setting it to true, create conditions in the function that will check the value/the length of value. 
        //If the conditions are met, set the value in the state to the required string and the variable isReq to false.
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Please enter a email address');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Please enter a valid email address');
        }
        return isReq;
    }

    const handleSubmit = (e) => { //In the handlesubmit function—after e.preventDefault()—assign the validate function to the newly created variable isReq. 
        //Then, create a condition that checks for isReq before carrying out the remainder of the code in the handlesubmit.
        e.preventDefault();
        const isReq = validate();

        if (isReq) {
            axios.post('https://myflixs.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful, please login');
                    window.open('/', '_self');
                })
                .catch(response => {
                    console.log(response);
                    alert('unable to register');
                });
        }
    };

    return (
        <Container id="registration-form">
            <Row>
                <Col>
                    <CardGroup>
                        <Card id="registration-card">
                            <Card.Body>
                                <Card.Title id="registration-card-title">Please register</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label id="registration-form-label">Username</Form.Label>
                                        <Form.Control  //use curly braces below to show the existence of code to return the value in the state: {usernameErr && <p>{usernameErr}</p>}
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder="Enter a username"
                                        />
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label id="registration-form-label">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter a Password"
                                            minLength="8"
                                        />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label id="registration-form-label">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter your email adress"
                                        />
                                        {emailErr && <p>{emailErr}</p>}
                                    </Form.Group>

                                    <Button id="register-button" variant="primary"
                                        type="submit"
                                        onClick={handleSubmit}>
                                        Register
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    )

}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func.isRequired
};