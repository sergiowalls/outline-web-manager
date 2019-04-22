import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

import KeyList from "./KeyList";
import {Card, ListGroup, Row} from "react-bootstrap";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.location.state;
    }

    componentDidMount() {
        if (this.state && this.state.apiUrl) {
            const {apiUrl} = this.state;
            axios
                .get(`${apiUrl}/server`)
                .then(response => {
                    this.setState({server: response.data});
                })
                .catch(error => console.log(error));
            axios
                .get(`${apiUrl}/access-keys`)
                .then(response => {
                    this.setState({keys: response.data.accessKeys});
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        if (!this.state || !this.state.apiUrl) {
            return <Redirect to='/'/>;
        }

        if (this.state.server && this.state.keys) {
            const {name, createdTimestampMs, metricsEnabled, portForNewAccessKeys, serverId} = this.state.server;
            return (
                <>
                    <Row><h2>Server details</h2></Row>
                    <Row><Card>
                        <Card.Body>
                            <h5 className="card-title">{name}</h5>
                            <ListGroup variant="flush">
                                <ListGroup.Item><span>Created on:</span> {createdTimestampMs}</ListGroup.Item>
                                <ListGroup.Item><span>Metrics enabled:</span> {metricsEnabled ? "true" : "false"}</ListGroup.Item>
                                <ListGroup.Item><span>Port for new access keys:</span> {portForNewAccessKeys}</ListGroup.Item>
                                <ListGroup.Item><span>Server ID:</span> {serverId}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    </Row>
                    <Row><KeyList keys={this.state.keys} apiUrl={this.state.apiUrl}/></Row>
                </>
            );
        }

        return null;
    }

}