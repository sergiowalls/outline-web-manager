import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Container} from "react-bootstrap"

export default class Key extends Component {


    constructor(props, context) {
        super(props, context);
        this.currentKey = props.current;
        this.apiUrl = props.apiUrl;

        this.notifyDeleted = props.notifyDeleted;
        this.deleteKey = this.deleteKey.bind(this);
    }

    deleteKey() {
        axios
            .delete(`${this.apiUrl}/access-keys/${this.currentKey.id}`)
            .then(() => {
                this.notifyDeleted(this.currentKey.id);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Container fluid="true">
                <Card>
                    <Card.Body>
                        <h5 className="card-title">Key {this.currentKey.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Name: {this.currentKey.name}</h6>
                        <ul>
                            <li>Access Url: {this.currentKey.accessUrl}</li>
                            <li>Method: {this.currentKey.method}</li>
                            <li>Password: {this.currentKey.password}</li>
                            <li>Port: {this.currentKey.port}</li>
                        </ul>
                        <Button variant="primary">Rename</Button>
                        <Button variant="danger" onClick={this.deleteKey}>Delete</Button>
                    </Card.Body>
                </Card>
            </Container>)
    }
}