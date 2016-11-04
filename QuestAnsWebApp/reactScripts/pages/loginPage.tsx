import * as React from 'react';
import { LoginForm } from '../forms/loginForm';
import { userActions } from '../../scripts/actions/userActions';
import { FieldValidator } from '../../scripts/fieldValidator';
import { spinner } from '../../scripts/spinner';

export class LoginPage extends React.Component<any, any> {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor() {
        super();
        //this.mixins = [Navigator];
        this.state = {
            user: {
                UserName: '',
                Password: '',
                RememberMe: false
            },
            errors: {}
        }

        this.setUserState = this.setUserState.bind(this);
        this.signinUser = this.signinUser.bind(this);
    }

    setUserState(event) {
        let field = event.target.name;
        let value = event.target.value;
        this.state.user[field] = value;

        return this.setState({ user: this.state.user });
    }

    formIsValid() {
        this.state.errors = {};

        this.state.errors.UserName = FieldValidator.validateText(this.state.user.UserName, 3, 16);
        this.state.errors.Password = FieldValidator.validateText(this.state.user.Password, 8, 16);

        this.setState({ errors: this.state.errors });

        return !FieldValidator.hasErrors(this.state.errors);
    }

    signinUser(event) {
        event.preventDefault();

        if (!this.formIsValid()) {
            return;
        }

        spinner.spin()

        userActions.signin(this.state.user).then(function () {
            this.context.router.push('/user/' + this.state.user.UserName);
            spinner.stop();
        }.bind(this));
    }

    render() {
        return (
            <div>
                <LoginForm user={this.state.user} onChange={this.setUserState} onSave={this.signinUser} errors={this.state.errors} />
            </div>
        );
    }
}