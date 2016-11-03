import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import { Auth } from '../scripts/actions/auth';
import { App } from './app';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import { UserPage } from './pages/userPage';
import { NotFoundPage } from './pages/notFoundPage';
import { initActions } from '../scripts/actions/initActions';

let initReact = function () {
    ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={App}>

                <Route path="/login" component={LoginPage} onEnter={Auth.requireNotAuth} />
                <Route path="/register" component={RegisterPage} onEnter={Auth.requireNotAuth} />
                <Route path="/user/:userName" component={UserPage} onEnter={Auth.requireAuth} />

                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    ), document.getElementById('app'));
};

initActions.initApp(initReact);