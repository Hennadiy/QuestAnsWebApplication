class SimpleButton extends React.Component {
    render() {
        var cssClasses = "btn btn-";
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