import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Container, ListGroup} from "react-bootstrap"
import RenameAccessKey from "./RenameAccessKey";

export default class Key extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {currentKey: props.current};
        this.apiUrl = props.apiUrl;

        this.notifyDeleted = props.notifyDeleted;
        this.deleteKey = this.deleteKey.bind(this);
    }

    updateKeyName(name) {
        let currentKey = this.state.currentKey;
        currentKey.name = name;
        this.setState({currentKey: currentKey})
    }

    deleteKey() {
        axios
            .delete(`${this.apiUrl}/access-keys/${this.state.currentKey.id}`)
            .then(() => {
                this.notifyDeleted(this.state.currentKey.id);
            })
            .catch(error => console.log(error));
    }

    render() {
        const {id, name, accessUrl, method, password, port} = this.state.currentKey;

        return (
            <Container fluid="true">
                <Card>
                    <Card.Body>
                        <h5 className="card-title">Key {id}</h5>
                        <ListGroup variant="flush">
                            <ListGroup.Item><span>Name:</span> {name}</ListGroup.Item>
                            <ListGroup.Item><span>Access url:</span> {accessUrl}</ListGroup.Item>
                            <ListGroup.Item><span>Method:</span> {method}</ListGroup.Item>
                            <ListGroup.Item><span>Password:</span> {password}</ListGroup.Item>
                            <ListGroup.Item><span>Port:</span> {port}</ListGroup.Item>
                        </ListGroup>
                        <RenameAccessKey apiUrl={this.apiUrl} id={id} name={name}
                                         notifyRenamed={this.updateKeyName.bind(this)}/>
                        <Button variant="danger" onClick={this.deleteKey}>Delete</Button>
                    </Card.Body>
                </Card>
            </Container>)
    }
}