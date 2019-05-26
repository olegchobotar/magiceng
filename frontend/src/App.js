import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import './App.css'

import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './pages/Profile';
import Videos from './pages/Videos';
import Words from './pages/Words';

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {

        return (
            <Fragment>
                <Provider store = { store }>
                    <Router>
                        <div>
                            <Header />
                            <div>
                                <Route exact path="/" component={ Home } />
                                <Route exact path="/register" component={ Register } />
                                <Route exact path="/login" component={ Login } />
                                <Route exact path="/videos" component={ Videos } />
                                <Route exact path="/words" component={ Words } />
                                <Route exact path="/profile" component={ Profile } />
                            </div>
                        </div>
                    </Router>
                </Provider>
            </Fragment>

        );
    }
}

export default App;