import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import * as serviceWorker from "./serviceWorker";
import withAuth from './withAuth';

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';

import UserProfile from './components/UserProfile/UserProfile';
import Dashboard from './components/Dashboard/Dashboard';

import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

import './styles/styles.css';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/dashboard" component={withAuth(Dashboard)} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

serviceWorker.unregister();