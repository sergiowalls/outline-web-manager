import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from "react-bootstrap";

import LoginForm from './LoginForm'
import Home from './Home'

class App extends Component {
    render() {
        return (
            <Router>
                <Container>
                    <Route path="/" exact component={LoginForm}/>
                    <Route path="/home" exact component={Home}/>
                </Container>
            </Router>
        );
    }
}

export default App;
