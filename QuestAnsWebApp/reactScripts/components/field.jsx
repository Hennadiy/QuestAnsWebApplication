var React = require('react');
var Checker = require('../../scripts/checker');

class Field extends React.Component {

    render() {
        var type = "text";
        if (this.props.type) {
            type = this.props.type;
        }

        var wrapperClass = "form-group";
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " has-error";
        }
        var errors = [];
        if (this.props.error) {
            errors = this.props.error;
        }

        var value = Checker.getProperValue(this.props.value);

        var errorRender = function (e) {
            return (
                <div key={e}>{e}</div>
                );
        }

        return (
          <div className={wrapperClass}>
            <label htmlFor={this.props.name}>{this.props.label}</label>
            <div className="field">
                <input type={type} name={this.props.name} className="form-control" onChange={this.props.onChange} value={value} maxLength="32" />
                <div className="input">
                    {errors.map(errorRender)}
                </div>
            </div>
          </div>
      );
    }
}

Field.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

module.exports = Field;