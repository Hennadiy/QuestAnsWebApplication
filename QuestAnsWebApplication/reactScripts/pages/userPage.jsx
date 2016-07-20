class UserPage extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {
                Name: '',
                Surname: '',
                Email: '',
                UserName: ''
            }
        };
    }

    componentWillMount() {
        var userName = this.props.routeParams.userName;
        if (userName) {
            userActions.getUserByUserName(userName)
                .then(function (user) {
                    if (user) {
                        this.setState({ user: user });
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

    render() {
        return (
            <div>
                <DisplayField name="Name" value={this.state.user.Name} />
                <DisplayField name="Surname" value={this.state.user.Surname} />
                <DisplayField name="Email" value={this.state.user.Email} />
                <DisplayField name="UserName" value={this.state.user.UserName} />
            </div>
            );
    }
}

UserPage.contextTypes = {
    router: React.PropTypes.object
}