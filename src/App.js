import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import LoginForm from './LoginForm'
import Home from './Home'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Route path="/" exact component={LoginForm}/>
                    <Route path="/home" exact component={Home}/>
                </div>
            </Router>
        );
    }
}

export default App;
