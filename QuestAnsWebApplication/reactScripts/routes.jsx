
var initReact = function (){
    ReactDOM.render((
        <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={App}>

            <ReactRouter.Route path="/login" component={LoginPage} onEnter={Auth.requireNotAuth}/>
            <ReactRouter.Route path="/register" component={RegisterPage} onEnter={Auth.requireNotAuth}/>
            <ReactRouter.Route path="/user/:userName" component={UserPage} onEnter={Auth.requireAuth} />

            <ReactRouter.Route name="error" path="*" component={NotFoundPage} />
        </ReactRouter.Route>
    </ReactRouter.Router>
    ), document.getElementById('app'));
}

initActions.initApp(initReact);
