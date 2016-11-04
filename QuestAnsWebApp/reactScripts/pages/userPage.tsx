import * as React from 'react';
import * as $ from 'jquery';
import * as toastr from 'toastr';
import { User } from '../../scripts/models/userModels';
import { EditUserForm } from '../forms/EditUserForm';
import { DisplayUserForm } from '../forms/displayUserForm';
import { Panel } from '../components/panel';
import { userStore } from '../../scripts/stores/userStore';
import { userActions } from '../../scripts/actions/userActions';
import { spinner } from '../../scripts/Spinner';
import { Checker } from '../../scripts/checker';

export class UserPage extends React.Component<any, any> {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor() {
        super();

        this.state = {
            user: new User(),
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
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    getUserProfile(userName: string): void {
        if (userName) {
            userActions.getUserByUserName(userName)
                .then(function (user) {
                    if (user) {
                        let allowEdit = user.UserName === this.state.currentUser.UserName;
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
    componentWillMount() {
        this.getUserProfile(this.props.routeParams.userName);
    }

    componentWillReceiveProps(nextProps) {
        this.getUserProfile(nextProps.routeParams.userName);
    }

    setUserState(event) {
        let field = event.target.name;
        let value = event.target.value;
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
        let content;
        if (this.state.isEditing) {
            content = (<EditUserForm user={this.state.user} onSave={this.saveUser} addImage={this.addImage} onChange={this.setUserState} onCancel={this.cancelEditing} />);
        }
        else {
            content = (<DisplayUserForm user={this.state.user} />);
        }

        let fullName = this.state.user.Name + " " + this.state.user.Surname;

        let additional = {
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