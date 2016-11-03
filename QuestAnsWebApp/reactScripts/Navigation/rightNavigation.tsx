import * as React from 'react';
import { Link } from 'react-router';
import { userActions } from '../../scripts/actions/userActions';
import { userStore } from '../../scripts/stores/userStore';

export class RightNavigation extends React.Component<any, any> {
    static contextTypes = {
        router: React.PropTypes.object
    }
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
        let links = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="login">Log In</Link>
                </li>
                <li>
                    <Link to="register">Register</Link>
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