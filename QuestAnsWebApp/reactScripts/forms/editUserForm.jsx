var React = require('react');
var Field = require('../components/field.jsx');
var SimpleButton = require('../components/simplebutton.jsx');
var Dropdown = require('../components/dropdown.jsx');
var DatepickerQA = require('../components/datepickerqa.jsx');
var infoActions = require('../../scripts/actions/infoActions');

class EditUserForm extends React.Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            cities: []
        };

        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.loadCities = this.loadCities.bind(this);
    }

    componentWillMount() {
        infoActions.getCountries().then(function (countries) {
            this.setState({ countries: countries });
        }.bind(this));

        this.loadCities();
    }

    loadCities() {
        if (this.props.user.CountryId) {
            infoActions.getCities(this.props.user.CountryId).then(function (cities) {
                this.setState({ cities: cities });
            }.bind(this));
        }
    }

    onChangeCountry(event) {
        this.props.onChange(event);
        this.loadCities();
    }

    render() {
        return (
            <form>
                <Field label="Name" name="Name" value={this.props.user.Name} onChange={this.props.onChange } />
                <Field label="Surname" name="Surname" value={this.props.user.Surname} onChange={this.props.onChange } />
                <DatepickerQA label="Birthdate" name="Birthdate" value={this.props.user.Birthdate} onChange={this.props.onChange} />
                <Dropdown label="Country" name="CountryId" value={this.props.user.CountryId} values={this.state.countries} onChange={this.onChangeCountry } defaultValueText="Select Country" />
                <Dropdown label="City" name="CityId" value={this.props.user.CityId} values={this.state.cities} onChange={this.props.onChange } defaultValueText="Select City" />
                <Field label="Skype" name="Skype" value={this.props.user.Skype} onChange={this.props.onChange } />
                <Field label="Phone Number" name="PhoneNumber" value={this.props.user.PhoneNumber} onChange={this.props.onChange } />
                <SimpleButton text="Save" onClick={this.props.onSave } />
                <SimpleButton text="Cancel" onClick={this.props.onCancel } />
            </form>
        );
    }
}

module.exports = EditUserForm;