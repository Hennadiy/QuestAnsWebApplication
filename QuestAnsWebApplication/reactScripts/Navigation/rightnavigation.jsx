class RightNavigation extends React.Component {
    constructor() {
        super();

        this.state = {
            user: userStore.getCurrentUser()
        };

        this.signOut = this.signOut.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        userStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        userStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({ user: userStore.getCurrentUser() });
    }

    signOut(event) {
        event.preventDefault();
        userActions.signout().then(function () {
            this.context.router.push('/login');
        }.bind(this));
    }

    render() {
        var links = (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <ReactRouter.Link to="login">Log In</ReactRouter.Link>
                        </li>
                        <li>
                            <ReactRouter.Link to="register">Register</ReactRouter.Link>
                        </li>
                    </ul>
                );
        if (this.state.user) {
            links = (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="javascript:;" onClick={this.signOut}>Sign Out</a>
                        </li>
                    </ul>
                );
        }

        return links;
    }
}

RightNavigation.contextTypes = {
    router: React.PropTypes.object
}