import * as React from 'react';

export class Checkbox extends React.Component<any, any> {
    render() {
        return (
            <div className="checkbox">
                <label><input type="checkbox" value={this.props.value} />{this.props.label}</label>
            </div>
        );
    }
}