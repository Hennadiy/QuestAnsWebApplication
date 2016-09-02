﻿var React = require('react');
var moment = require('moment');
var DatePicker = require('react-datepicker');

class DatepickerQA extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onChange({
            target: {
                name: this.props.name,
                value: event._d
            }
        })
    }

    render() {

        var date = moment();
        if (this.props.value) {
            date = moment(this.props.value);
        }

        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <DatePicker showYearDropdown
                                dateFormat="DD.MM.YYYY"
                                selected={date}
                                onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}

module.exports = DatepickerQA;