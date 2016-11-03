import * as React from 'react';

export class DisplayField extends React.Component<any, any> {
    render() {
        if (!this.props.value) {
            return (<span></span>);
        }

        return (
            <div className="row">
                <div className="col-lg-6">
                    {this.props.name}
                </div>
                <div className="col-lg-6">
                    {this.props.value}
                </div>
            </div>
        );
    }
}