"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var react_router_1 = require('react-router');
var auth_1 = require('../scripts/actions/auth');
var app_1 = require('./app');
var loginPage_1 = require('./pages/loginPage');
var registerPage_1 = require('./pages/registerPage');
var userPage_1 = require('./pages/userPage');
var notFoundPage_1 = require('./pages/notFoundPage');
var initActions_1 = require('../scripts/actions/initActions');
var initReact = function () {
    ReactDOM.render((<react_router_1.Router history={react_router_1.browserHistory}>
            <react_router_1.Route path="/" component={app_1.App}>

                <react_router_1.Route path="/login" component={loginPage_1.LoginPage} onEnter={auth_1.Auth.requireNotAuth}/>
                <react_router_1.Route path="/register" component={registerPage_1.RegisterPage} onEnter={auth_1.Auth.requireNotAuth}/>
                <react_router_1.Route path="/user/:userName" component={userPage_1.UserPage} onEnter={auth_1.Auth.requireAuth}/>

                <react_router_1.Route path="*" component={notFoundPage_1.NotFoundPage}/>
            </react_router_1.Route>
        </react_router_1.Router>), document.getElementById('app'));
};
initActions_1.initActions.initApp(initReact);
