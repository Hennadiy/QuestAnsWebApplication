import * as React from 'react';

export class SimpleButton extends React.Component<any, any> {
    render() {
        let cssClasses = "btn btn-";
        if (this.props.cssClasses) {
            cssClasses += this.props.cssClasses;
        }
        else {
            cssClasses += 'default';
        }

        return (
            <button type="submit" onClick={this.props.onClick} className={cssClasses}>{this.props.text}</button>
        );
    }
}