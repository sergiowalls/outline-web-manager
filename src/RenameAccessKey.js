import React, {Component} from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import axios from "axios";

export default class RenameAccessKey extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {show: false, id: props.id, name: props.name};
        this.apiUrl = props.apiUrl;

        this.notifyRenamed = props.notifyRenamed;

        this.handleChange = this.handleChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renameKey = this.renameKey.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    renameKey() {
        axios
            .put(`${this.apiUrl}/access-keys/${this.state.id}/name`, {"name": this.state.name})
            .then(() => {
                this.handleClose();
                this.notifyRenamed(this.state.name);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>Rename</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename access key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Control placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={this.renameKey}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
