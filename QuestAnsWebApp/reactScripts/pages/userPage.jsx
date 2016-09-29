var React = require('react');
var $ = require('jquery');
var EditUserForm = require('../forms/editUserForm.jsx');
var DisplayUserForm = require('../forms/displayUserForm.jsx');
var Panel = require('../components/panel.jsx');
var userStore = require('../../scripts/stores/userStore');
var userActions = require('../../scripts/actions/userActions');
var spinner = require('../../scripts/Spinner');
var toastr = require('toastr');
var Checker = require('../../scripts/checker');

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
                PhotoUrl: '',
                Birthdate: null,
                CityId: null,
                City: {
                    Value: null
                },
                CountryId: null,
                Country: {
                    Value: null
                }
            },
            image: null,
            currentUser: userStore.getCurrentUser(),
            allowEdit: false,
            isEditing: false
        };

        this.setUserState = this.setUserState.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.addImage = this.addImage.bind(this);
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

    cancelEditing(event) {
        event.preventDefault();

        this.setState({ isEditing: false });
    }

    saveUser(event) {
        function updateUser() {
            userActions.update(this.state.user).then(function (user) {
                this.setState({ user: user, allowEdit: true, isEditing: false });
                spinner.stop();
                toastr.success("Your profile have been updated.");
            }.bind(this));
        }

        spinner.spin();
        event.preventDefault();

        if (this.state.user.Birthdate) {
            this.state.user.Birthdate = this.state.user.Birthdate.toJSON();
        }

        this.state.user.CountryId = Checker.checkDropDownValue(this.state.user.CountryId);
        this.state.user.CityId = Checker.checkDropDownValue(this.state.user.CityId);

        if (this.state.image) {
            userActions.uploadUserPhoto(this.state.image).then(function (photoUrl) {
                this.state.user.PhotoUrl = photoUrl;
                updateUser.bind(this)();
            }.bind(this));
        }
        else {
            updateUser.bind(this)();
        }
    }

    addImage(file) {
        this.setState({ image: file });
    }

    goToEdit(event) {
        event.preventDefault();

        this.setState({ isEditing: true });
    }

    render() {
        var content;
        if (this.state.isEditing) {
            content = (<EditUserForm user={this.state.user} onSave={this.saveUser} addImage={this.addImage} onChange={this.setUserState} onCancel={this.cancelEditing } />);
        }
        else {
            content = (<DisplayUserForm user={this.state.user } />);
        }

        var fullName = this.state.user.Name + " " + this.state.user.Surname;

        var additional = {
            isVisible: this.state.allowEdit && !this.state.isEditing,
            text: 'Edit',
            onClick: this.goToEdit
        };

        return (
            <Panel headerText={fullName} additional={additional}>
                {content}
            </Panel>
            );
    }
}

UserPage.contextTypes = {
    router: React.PropTypes.object
}

module.exports = UserPage;