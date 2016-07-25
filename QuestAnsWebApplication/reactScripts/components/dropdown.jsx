class Dropdown extends React.Component {
    render() {
        var optionRender = function (e) {
            return (
                <option key={e.id} value={e.value}>{e.value}</option>
                );
        }
        var value = "-1";

        if (this.props.selectedValue) {
            value = this.props.value;
        }

        return (
             <div className="form-group" hidden={this.props.values.length === 0}>
                <label htmlFor={this.props.name }>{this.props.label}</label>
                <div className="field">
                    <select name={this.props.name} value={value}>
                        <option value="-1">{this.props.defaultValueText}</option>
                        {this.props.values.map(optionRender)}
                    </select>
                </div>
             </div>
            );
    }
}