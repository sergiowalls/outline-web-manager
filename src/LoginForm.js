import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap"
import Alert from "react-bootstrap/Alert";

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
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <FormLabel>Enter your API url (without the last slash):</FormLabel>
                    <FormControl type="text" placeholder="https://example.com/1234abc"
                                 value={this.state.apiUrl} onChange={this.handleChange}/>
                </FormGroup>
                <Button variant="primary" type="submit">Submit</Button>
                {error &&
                <Alert variant="warning">Wrong url! Perhaps you have misspelled it or server is down...</Alert>}
            </Form>
        );
    }
}