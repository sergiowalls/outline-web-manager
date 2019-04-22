import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {apiUrl: '', redirect: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({apiUrl: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .get(`${this.state.apiUrl}/server`)
            .then(() => {
                this.setState({redirect: true, error: false})
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true})
            });
    }

    render() {
        const {redirect, error} = this.state;

        if (redirect) {
            return <Redirect to={{pathname: '/home', state: this.state}}/>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Enter your API url (without the last slash):
                    </label>
                    <input type="text" placeholder="https://example.com/1234abc" className="form-control"
                           value={this.state.apiUrl} onChange={this.handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {error &&
                <div className="alert alert-warning" role="alert">
                    Wrong url! Perhaps you have misspelled it or server is down...
                </div>}
            </form>
        );
    }
}