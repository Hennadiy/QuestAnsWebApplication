var React = require('react');

class Panel extends React.Component {
    render() {

        var additionalHtml;

        if (this.props.additional.isVisible) {
            var spanStyle = {
                float: "right"
            }
            additionalHtml = (
                            <span style={spanStyle}>
                                <a href="javascript:;" onClick={this.props.additional.onClick }>{this.props.additional.text}</a>
                            </span>
                            );
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.headerText}
                    {additionalHtml}
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
            );
    }
}

module.exports = Panel;
