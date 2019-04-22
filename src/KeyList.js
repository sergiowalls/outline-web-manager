import React, {Component} from "react";
import {Button, Modal, Row} from "react-bootstrap"

import Key from './Key'

export default class KeyList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {keys: props.keys, show: false};
        this.apiUrl = props.apiUrl;

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    removeKey(id) {
        const newState = this.state;
        const index = newState.keys.findIndex(a => a.id === id);

        if (index === -1) return;
        newState.keys.splice(index, 1);

        this.setState(newState);
    }

    render() {
        const {keys} = this.state;

        return (
            <>
                <Row><h2>Access keys</h2></Row>
                <Row>
                    {keys.map(k => <Key key={k.id} current={k} apiUrl={this.apiUrl}
                                        notifyDeleted={this.removeKey.bind(this)}/>)}
                </Row>
                <Row>
                    <Button variant="success" onClick={this.handleShow}>New key</Button>
                </Row>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new access key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Would you like to add a new access key?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}