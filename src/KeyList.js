import React, {Component} from "react";

import Key from './Key'

export default class KeyList extends Component {

    constructor(props, context) {
        super(props, context);
        this.keys = props.keys;
        this.apiUrl = props.apiUrl;
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.keys.map(k => <Key key={k.id} current={k} apiUrl={this.apiUrl}/>)}
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success">New key</button>
                </div>
            </div>
        )
    }
}