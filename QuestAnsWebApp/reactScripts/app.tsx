import * as React from 'react';
import { RightNavigation } from './Navigation/rightNavigation';
import { BrandNavigation } from './Navigation/brandNavigation';

export class App extends React.Component<any, any> {

    render() {
        let copyRights = "© " + (new Date()).getFullYear() + " - Question & Answer Application.";

        return (
            <div>
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <BrandNavigation />
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li></li>
                            </ul>

                            <RightNavigation />
                        </div>
                    </div>
                </div>

                <div className="container body-content">
                    {this.props.children}

                    <hr />

                    <footer>
                        <p>{copyRights}</p>
                    </footer>
                </div>
            </div>
        );
    }
}