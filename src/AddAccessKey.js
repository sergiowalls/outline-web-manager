import React, {Component} from "react";
import {Button, Modal, Row} from "react-bootstrap";
import axios from "axios";

export default class AddAccessKey extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {show: false};
        this.apiUrl = props.apiUrl;

        this.notifyAdded = props.notifyAdded;

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addKey = this.addKey.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    addKey() {
        axios
            .post(`${this.apiUrl}/access-keys`)
            .then(response => {
                this.handleClose();
                this.notifyAdded(response.data);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <Row>
                    <Button variant="success" onClick={this.handleShow}>New key</Button>
                </Row>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new access key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Would you like to add a new access key?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>No</Button>
                        <Button variant="primary" onClick={this.addKey}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
