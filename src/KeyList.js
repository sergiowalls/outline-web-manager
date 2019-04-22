import React, {Component} from "react";
import {Row} from "react-bootstrap"

import Key from './Key'
import AddAccessKey from "./AddAccessKey";

export default class KeyList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {keys: props.keys};
        this.apiUrl = props.apiUrl;
    }

    addKey(key) {
        const newState = this.state;
        newState.keys.push(key);
        this.setState(newState);
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
                <AddAccessKey apiUrl={this.apiUrl} notifyAdded={this.addKey.bind(this)}/>
            </>
        )
    }
}