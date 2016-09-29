var React = require('react');
var moment = require('moment');
var DisplayField = require('../components/displayField.jsx');
var Checker = require('../../scripts/checker');
var DisplayUserImage = require('../components/displayUserImage.jsx');

class DisplayUserForm extends React.Component {
    render() {

        var country = Checker.getProperValueObj(this.props.user.Country, "Value");
        var city = Checker.getProperValueObj(this.props.user.City, "Value");

        var birthdate = '';
        if (this.props.user.Birthdate) {
            birthdate = moment(new Date(this.props.user.Birthdate)).format('DD.MM.YYYY');
        }

        return (
                <div className="row">
                    <div className="col-md-5">
                        <DisplayUserImage url={this.props.user.PhotoUrl} />
                    </div>
                    <div className="col-md-7">
                        <DisplayField name="Country" value={country } />
                        <DisplayField name="City" value={city } />
                        <DisplayField name="Birthdate" value={birthdate } />
                        <DisplayField name="Skype" value={this.props.user.Skype } />
                        <DisplayField name="Email" value={this.props.user.Email } />
                        <DisplayField name="Phone Number" value={this.props.user.PhoneNumber } />
                    </div>
                </div>
            );
    }
}

module.exports = DisplayUserForm;