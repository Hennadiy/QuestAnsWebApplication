import * as React from 'react';
import { Checker } from '../../scripts/checker';

export class Field extends React.Component<any, any> {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    }

    render() {
        let type = "text";
        if (this.props.type) {
            type = this.props.type;
        }

        let wrapperClass = "form-group";
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " has-error";
        }
        let errors = [];
        if (this.props.error) {
            errors = this.props.error;
        }

        let value = Checker.getProperValue(this.props.value);

        let errorRender = (e) => {
            return (
                <div key={e}>{e}</div>
            );
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <input type={type} name={this.props.name} className="form-control" onChange={this.props.onChange} value={value} maxLength={32} />
                    <div className="input">
                        {errors.map(errorRender)}
                    </div>
                </div>
            </div>
        );
    }
}