import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Button, Card, CardBody, CardGroup, Col, Container,
    Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import APIServices from "../Service";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password: '',
            token: ''
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.username === '' || this.state.password === '') {
            alert('Please enter both User Name and Password');
        } else {
        event.preventDefault();
            console.log("Before call");
            APIServices.login(this.state.username, this.state.password).then(res => {
                this.setState({
                    token: res.data.token
                });
                sessionStorage.setItem('token', res.data.token)
            }
            ).catch(error => { alert(error.message)});
        }

    }

    render() {
        if (this.state.token) {
            return (
                < Redirect to="/dashboard" />
            );
        }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit= {this.handleSubmit}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Username" autoComplete="username" onChange={this.handleUserNameChange} />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password" autoComplete="current-password" onChange={this.handlePasswordChange} />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Do have account?</p>
                                            <Link to="/register">
                                                <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;