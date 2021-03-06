﻿import * as React from 'react';
import { RegisterForm } from '../forms/registerForm.jsx';
import * as toastr from 'toastr';
import { spinner } from '../../scripts/Spinner';
import { FieldValidator } from '../../scripts/fieldValidator';
import { userActions } from '../../scripts/actions/userActions';

export class RegisterPage extends React.Component<any, any> {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor() {
        super();

        this.state = {
            user: {
                UserName: '',
                Name: '',
                Surname: '',
                Email: '',
                Password: '',
                RepPassword: ''
            },
            errors: {}
        }

        this.setUserState = this.setUserState.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    setUserState(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;

        return this.setState({ user: this.state.user });
    }

    formIsValid() {
        this.state.errors = {};

        this.state.errors.UserName = FieldValidator.validateText(this.state.user.UserName, 3, 16);
        this.state.errors.Name = FieldValidator.validateText(this.state.user.Name, 3, 24);
        this.state.errors.Surname = FieldValidator.validateText(this.state.user.Surname, 3, 24);
        this.state.errors.Email = FieldValidator.validateEmail(this.state.user.Email);
        this.state.errors.Password = FieldValidator.validatePassword(this.state.user.Password, 8, 16);
        this.state.errors.RepPassword = FieldValidator.isEqualPasswords(this.state.user.Password, this.state.user.RepPassword);

        this.setState({ errors: this.state.errors });

        return !FieldValidator.hasErrors(this.state.errors);
    }

    registerUser(event) {
        event.preventDefault();

        if (!this.formIsValid()) {
            return;
        }

        spinner.spin();

        userActions.register(this.state.user).then(function () {
            spinner.stop();
            toastr.success("You have been registered.");
            this.context.router.push('login');
        }.bind(this));
    }

    render() {
        return (
            <div>
                <RegisterForm user={this.state.user} onChange={this.setUserState} onSave={this.registerUser} errors={this.state.errors} />
            </div>
        );
    }
}