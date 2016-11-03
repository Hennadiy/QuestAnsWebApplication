import * as React from 'react';
import * as moment from 'moment';
import { DisplayField } from '../components/displayField';
import { Checker } from '../../scripts/checker';
import { DisplayUserImage } from '../components/displayUserImage';

export class DisplayUserForm extends React.Component<any, any> {
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
                    <DisplayField name="Country" value={country} />
                    <DisplayField name="City" value={city} />
                    <DisplayField name="Birthdate" value={birthdate} />
                    <DisplayField name="Skype" value={this.props.user.Skype} />
                    <DisplayField name="Email" value={this.props.user.Email} />
                    <DisplayField name="Phone Number" value={this.props.user.PhoneNumber} />
                </div>
            </div>
        );
    }
}