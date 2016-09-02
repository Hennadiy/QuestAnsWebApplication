var React = require('react');
var ReactRouter = require('react-router');
var userStore = require('../../scripts/stores/userStore');

class BrandNavigation extends React.Component {

    constructor() {
        super();

        this.state = {
            user: userStore.getCurrentUser()
        };

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

    render() {
        var link = "/login";

        if (this.state.user) {
            link = "/user/" + this.state.user.UserName;
        }

        return (
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <ReactRouter.Link to={link} className="navbar-brand">Question & Answer</ReactRouter.Link>
            </div>
            );
    }
}

module.exports = BrandNavigation;