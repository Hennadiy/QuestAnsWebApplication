var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var App = require('./app.jsx');
var LoginPage = require('./pages/loginPage.jsx');
var RegisterPage = require('./pages/registerPage.jsx');
var UserPage = require('./pages/userPage.jsx');
var NotFoundPage = require('./pages/notFoundPage.jsx');
var initActions = require('../scripts/actions/initActions');
var Auth = require('../scripts/actions/auth');

var initReact = function () {
    ReactDOM.render((
        <ReactRouter.Router history={ReactRouter.browserHistory }>
        <ReactRouter.Route path="/" component={App }>

            <ReactRouter.Route path="/login" component={LoginPage} onEnter={Auth.requireNotAuth } />
            <ReactRouter.Route path="/register" component={RegisterPage} onEnter={Auth.requireNotAuth } />
            <ReactRouter.Route path="/user/:userName" component={UserPage} onEnter={Auth.requireAuth } />

            <ReactRouter.Route name="error" path="*" component={NotFoundPage } />
        </ReactRouter.Route>
        </ReactRouter.Router>
    ), document.getElementById('app'));
};

initActions.initApp(initReact);