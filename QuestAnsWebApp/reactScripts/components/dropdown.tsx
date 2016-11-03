import * as React from 'react';

export class Dropdown extends React.Component<any, any> {
    render() {
        var optionRender = function (e) {
            return (
                <option key={e.Id} value={e.Id}>{e.Value}</option>
            );
        }

        var value = "-1";
        if (this.props.value) {
            value = this.props.value;
        }

        return (
            <div className="form-group" hidden={this.props.values.length === 0}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select name={this.props.name} value={value} onChange={this.props.onChange} className="form-control">
                        <option value="-1">{this.props.defaultValueText}</option>
                        {this.props.values.map(optionRender)}
                    </select>
                </div>
            </div>
        );
    }
}