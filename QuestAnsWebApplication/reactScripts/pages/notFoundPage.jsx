class NotFoundPage extends React.Component {
    render() {
        return(
                <div>
                    <h1>Page Not Found</h1>
                    <p>Whoops! Sorry, there is nothing to see here.</p>
                    <p>
                        <ReactRouter.Link to="/">Back to Home</ReactRouter.Link>
                    </p>
                </div>
            );
    }
}