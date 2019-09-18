import React, { Component } from 'react';
import {
    Button, Card, CardBody, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import APIServices from "../Service";
import { Redirect } from 'react-router-dom';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            signedup: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onRepeatPasswordChange(event) {
        this.setState({ repeatPassword: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.password || !this.state.username || !this.state.repeatPassword) {
            alert("Please enter all necessary details");
        } else if (this.state.password !== this.state.repeatPassword) {
            alert("Passwords do not match");
        } else {
            APIServices.signup(this.state.username, this.state.password).then(res => {
                this.setState({
                    signedup: true
                });
            }
            ).catch(error => { alert(error.message) });
        }
    }
    render() {
        console.log(this.state.signedup);
        if (this.state.signedup) {
            return (
                < Redirect to="/login" />
            );
        }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.handleSubmit}>
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username"
                                                onChange={this.onUsernameChange}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" autoComplete="new-password"
                                                onChange={this.onPasswordChange}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Repeat password" autoComplete="new-password"
                                                onChange={this.onRepeatPasswordChange}
                                            />
                                        </InputGroup>
                                        <Button color="success" block>Create Account</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Register;