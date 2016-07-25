class Panel extends React.Component {
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.headerText}
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
            );
    }
}