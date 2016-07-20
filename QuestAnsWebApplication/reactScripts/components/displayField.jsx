class DisplayField extends React.Component {
    render() {
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