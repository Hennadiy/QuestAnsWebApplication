class Checkbox extends React.Component {
    render() {
        return (
            <div className="checkbox">
                <label><input type="checkbox" value={this.props.value} />{this.props.label}</label>
            </div>
            );
    }
}