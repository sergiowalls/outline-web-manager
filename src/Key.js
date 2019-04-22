import React, {Component} from "react";
import axios from "axios";

export default class Key extends Component {


    constructor(props, context) {
        super(props, context);
        this.currentKey = props.current;
        this.apiUrl = props.apiUrl;

        this.deleteKey = this.deleteKey.bind(this);
    }

    deleteKey() {
        axios
            .delete(`${this.apiUrl}/access-keys/${this.currentKey.id}`)
            .then(response => {

            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="card container-fluid">
                <div className="card-body">
                    <h5 className="card-title">Key {this.currentKey.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Name: {this.currentKey.name}</h6>
                    <ul>
                        <li>Access Url: {this.currentKey.accessUrl}</li>
                        <li>Method: {this.currentKey.method}</li>
                        <li>Password: {this.currentKey.password}</li>
                        <li>Port: {this.currentKey.port}</li>
                    </ul>
                    <button type="button" className="btn btn-primary">Rename</button>
                    <button type="button" className="btn btn-danger" onClick={this.deleteKey}>Delete</button>
                </div>
            </div>)
    }
}