import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

import KeyList from "./KeyList";

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
                <div>
                    <h1>{name}</h1>
                    <ul>
                        <li>Created on: {createdTimestampMs}</li>
                        <li>Metrics enabled: {metricsEnabled ? "true" : "false"}</li>
                        <li>Port for new access keys: {portForNewAccessKeys}</li>
                        <li>Server ID: {serverId}</li>
                    </ul>
                    <KeyList keys={this.state.keys} apiUrl={this.state.apiUrl}/>
                </div>
            );
        }

        return null;
    }

}