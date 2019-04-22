import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

import KeyList from "./KeyList";
import {ListGroup} from "react-bootstrap";

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
                    <h1>{name}</h1>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Created on: {createdTimestampMs}</ListGroup.Item>
                        <ListGroup.Item>Metrics enabled: {metricsEnabled ? "true" : "false"}</ListGroup.Item>
                        <ListGroup.Item>Port for new access keys: {portForNewAccessKeys}</ListGroup.Item>
                        <ListGroup.Item>Server ID: {serverId}</ListGroup.Item>
                    </ListGroup>
                    <KeyList keys={this.state.keys} apiUrl={this.state.apiUrl}/>
                </>
            );
        }

        return null;
    }

}