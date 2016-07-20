class LoginPage extends React.Component {

    constructor() {
        super();
        this.mixins = [Navigator];
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
        var field = event.target.name;
        var value = event.target.value;
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

        userActions.signin(this.state.user).then(function () {
            this.context.router.push('/user/' + this.state.user.UserName);
        }.bind(this));
    }

    render() {
        return (
            <div>
                <LoginForm user={this.state.user} onChange={this.setUserState} onSave={this.signinUser} errors={this.state.errors } />
            </div>
            );
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}