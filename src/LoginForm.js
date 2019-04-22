import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Alert, Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap"

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {apiUrl: '', redirect: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({apiUrl: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .get(`${this.state.apiUrl}/server`)
            .then(() => {
                this.setState({redirect: true, error: false})
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true})
            });
    }

    render() {
        const {redirect, error} = this.state;

        if (redirect) {
            return <Redirect to={{pathname: '/home', state: this.state}}/>;
        }

        return (
            <>
                <h1 className="text-center">Welcome to Outline Web Manager</h1>
                <Row className="justify-content-md-center"><Col s={12} md={8} lg={6} xl={5}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <FormLabel>Enter your API url (without the last slash):</FormLabel>
                                    <FormControl type="text" placeholder="https://example.com/1234abc"
                                                 value={this.state.apiUrl} onChange={this.handleChange}/>
                                </FormGroup>
                                <Button variant="primary" type="submit">Submit</Button>
                                {error &&
                                <Alert variant="warning">Wrong url! Perhaps you have misspelled it or server is
                                    down...</Alert>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col></Row>
            </>
        );
    }
}