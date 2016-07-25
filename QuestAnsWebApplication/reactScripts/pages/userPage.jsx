class UserPage extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {
                Name: '',
                Surname: '',
                Email: '',
                UserName: '',
                Skype: '',
                PhoneNumber: '',
                BirthDate: '',
                City: '',
                Country: ''
            },
            currentUser: userStore.getCurrentUser(),
            allowEdit: false,
            isEditing: false
        };

        this.setUserState = this.setUserState.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    componentWillMount() {
        var userName = this.props.routeParams.userName;
        if (userName) {
            userActions.getUserByUserName(userName)
                .then(function (user) {
                    if (user) {
                        var allowEdit = user.UserName === this.state.currentUser.UserName;
                        this.setState({ user: user, allowEdit: allowEdit });
                    }
                    else {
                        this.context.router.push('/404');
                    }
                }.bind(this));
        }
        else {
            this.context.router.push('/404');
        }
    }

    setUserState(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;

        return this.setState({ user: this.state.user });
    }

    saveUser(event) {
        event.preventDefault();

        userActions.update(this.state.user).then(function (user) {
            this.setState({ user: user, allowEdit: true, isEditing: false });
        });
    }

    render() {
        var fullName = this.state.user.Name + " " + this.state.user.Surname;

        var content = (
                    <span>
                        <DisplayField name="Country" value={this.state.user.Country } />
                        <DisplayField name="City" value={this.state.user.City } />
                        <DisplayField name="BirthDate" value={this.state.user.BirthDate } />
                        <DisplayField name="Skype" value={this.state.user.Skype } />
                        <DisplayField name="Email" value={this.state.user.Email } />
                        <DisplayField name="Phone Number" value={this.state.user.PhoneNumber } />
                    </span>
                    );

        if (this.state.isEditing) {
            content = (<UserEditForm user={this.state.user} onSave={this.saveUser} onChange={this.setUserState } />);
        }

        return (
            <Panel headerText={fullName}>
                <div className="row">
                    <div className="col-md-5">

                    </div>
                    <div className="col-md-7">
                        {content}
                    </div>
                </div>
            </Panel>
            );
    }
}

UserPage.contextTypes = {
    router: React.PropTypes.object
}