import * as React from 'react';
import { Link } from 'react-router';

export class NotFoundPage extends React.Component<any, any> {
    render() {
        return (
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