"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var field_1 = require('../components/field');
var simplebutton_1 = require('../components/simplebutton');
var dropdown_1 = require('../components/dropdown');
var datepickerqa_1 = require('../components/datepickerqa');
var infoActions_1 = require('../../scripts/actions/infoActions');
var edituserImage_1 = require('../components/edituserImage');
var EditUserForm = (function (_super) {
    __extends(EditUserForm, _super);
    function EditUserForm() {
        _super.call(this);
        this.state = {
            countries: [],
            cities: []
        };
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.loadCities = this.loadCities.bind(this);
    }
    EditUserForm.prototype.componentWillMount = function () {
        infoActions_1.infoActions.getCountries().then(function (countries) {
            this.setState({ countries: countries });
        }.bind(this));
        this.loadCities();
    };
    EditUserForm.prototype.loadCities = function () {
        if (this.props.user.CountryId) {
            infoActions_1.infoActions.getCities(this.props.user.CountryId).then(function (cities) {
                this.setState({ cities: cities });
            }.bind(this));
        }
    };
    EditUserForm.prototype.onChangeCountry = function (event) {
        this.props.onChange(event);
        if (event.value === -1) {
            this.props.onChange({
                target: {
                    name: 'CountryId',
                    value: -1
                }
            });
        }
        this.loadCities();
    };
    EditUserForm.prototype.render = function () {
        return (<div className="row">
                <div className="col-md-5">
                    <edituserImage_1.EditUserImage name="image" url={this.props.user.PhotoUrl} onChange={this.props.addImage}/>
                </div>
                <div className="col-md-7">
                    <form>
                        <field_1.Field label="Name" name="Name" value={this.props.user.Name} onChange={this.props.onChange}/>
                        <field_1.Field label="Surname" name="Surname" value={this.props.user.Surname} onChange={this.props.onChange}/>
                        <datepickerqa_1.DatepickerQA label="Birthdate" name="Birthdate" value={this.props.user.Birthdate} onChange={this.props.onChange}/>
                        <dropdown_1.Dropdown label="Country" name="CountryId" value={this.props.user.CountryId} values={this.state.countries} onChange={this.onChangeCountry} defaultValueText="Select Country"/>
                        <dropdown_1.Dropdown label="City" name="CityId" value={this.props.user.CityId} values={this.state.cities} onChange={this.props.onChange} defaultValueText="Select City"/>
                        <field_1.Field label="Skype" name="Skype" value={this.props.user.Skype} onChange={this.props.onChange}/>
                        <field_1.Field label="Phone Number" name="PhoneNumber" value={this.props.user.PhoneNumber} onChange={this.props.onChange}/>
                        <simplebutton_1.SimpleButton text="Save" onClick={this.props.onSave}/>
                        <simplebutton_1.SimpleButton text="Cancel" onClick={this.props.onCancel}/>
                    </form>
                </div>
            </div>);
    };
    return EditUserForm;
}(React.Component));
exports.EditUserForm = EditUserForm;
