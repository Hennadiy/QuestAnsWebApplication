"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var toastr = require('toastr');
var userModels_1 = require('../../scripts/models/userModels');
var EditUserForm_1 = require('../forms/EditUserForm');
var displayUserForm_1 = require('../forms/displayUserForm');
var panel_1 = require('../components/panel');
var userStore_1 = require('../../scripts/stores/userStore');
var userActions_1 = require('../../scripts/actions/userActions');
var Spinner_1 = require('../../scripts/Spinner');
var checker_1 = require('../../scripts/checker');
var UserPage = (function (_super) {
    __extends(UserPage, _super);
    function UserPage() {
        _super.call(this);
        this.state = {
            user: new userModels_1.User(),
            image: null,
            currentUser: userStore_1.userStore.getCurrentUser(),
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
    UserPage.prototype.getUserProfile = function (userName) {
        if (userName) {
            userActions_1.userActions.getUserByUserName(userName)
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
    };
    UserPage.prototype.componentWillMount = function () {
        this.getUserProfile(this.props.routeParams.userName);
    };
    UserPage.prototype.componentWillReceiveProps = function (nextProps) {
        this.getUserProfile(nextProps.routeParams.userName);
    };
    UserPage.prototype.setUserState = function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };
    UserPage.prototype.cancelEditing = function (event) {
        event.preventDefault();
        this.setState({ isEditing: false });
    };
    UserPage.prototype.saveUser = function (event) {
        function updateUser() {
            userActions_1.userActions.update(this.state.user).then(function (user) {
                this.setState({ user: user, allowEdit: true, isEditing: false });
                Spinner_1.spinner.stop();
                toastr.success("Your profile have been updated.");
            }.bind(this));
        }
        Spinner_1.spinner.spin();
        event.preventDefault();
        if (this.state.user.Birthdate) {
            this.state.user.Birthdate = this.state.user.Birthdate.toJSON();
        }
        this.state.user.CountryId = checker_1.Checker.checkDropDownValue(this.state.user.CountryId);
        this.state.user.CityId = checker_1.Checker.checkDropDownValue(this.state.user.CityId);
        if (this.state.image) {
            userActions_1.userActions.uploadUserPhoto(this.state.image).then(function (photoUrl) {
                this.state.user.PhotoUrl = photoUrl;
                updateUser.bind(this)();
            }.bind(this));
        }
        else {
            updateUser.bind(this)();
        }
    };
    UserPage.prototype.addImage = function (file) {
        this.setState({ image: file });
    };
    UserPage.prototype.goToEdit = function (event) {
        event.preventDefault();
        this.setState({ isEditing: true });
    };
    UserPage.prototype.render = function () {
        var content;
        if (this.state.isEditing) {
            content = (<EditUserForm_1.EditUserForm user={this.state.user} onSave={this.saveUser} addImage={this.addImage} onChange={this.setUserState} onCancel={this.cancelEditing}/>);
        }
        else {
            content = (<displayUserForm_1.DisplayUserForm user={this.state.user}/>);
        }
        var fullName = this.state.user.Name + " " + this.state.user.Surname;
        var additional = {
            isVisible: this.state.allowEdit && !this.state.isEditing,
            text: 'Edit',
            onClick: this.goToEdit
        };
        return (<panel_1.Panel headerText={fullName} additional={additional}>
                {content}
            </panel_1.Panel>);
    };
    UserPage.contextTypes = {
        router: React.PropTypes.object
    };
    return UserPage;
}(React.Component));
exports.UserPage = UserPage;
