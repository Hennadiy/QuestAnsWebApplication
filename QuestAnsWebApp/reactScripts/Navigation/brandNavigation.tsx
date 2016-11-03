import * as React from 'react';
import { Link } from 'react-router';
import { userStore } from '../../scripts/stores/userStore';

export class BrandNavigation extends React.Component<any, any> {

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
                <Link to={link} className="navbar-brand">Question & Answer</Link>
            </div>
        );
    }
}