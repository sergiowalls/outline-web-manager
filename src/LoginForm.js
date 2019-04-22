import React, {Component} from 'react';
import axios from "axios";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {apiUrl: ''};

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
                localStorage.setItem("apiUrl", this.state.apiUrl);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter the secret:
                    <input type="text" value={this.state.apiUrl} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}