import React, {Component} from "react";

import Key from './Key'

export default class KeyList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {keys: props.keys};
        this.apiUrl = props.apiUrl;
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
            <div>
                <div className="row">
                    {keys.map(k => <Key key={k.id} current={k} apiUrl={this.apiUrl}
                                                   notifyDeleted={this.removeKey.bind(this)}/>)}
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success">New key</button>
                </div>
            </div>
        )
    }
}