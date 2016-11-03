import * as React from 'react';

export class DisplayUserImage extends React.Component<any, any> {
    render() {
        let url = "http://foryouindia.com/Default/Pages/Images/Profile.png";

        if (this.props.url) {
            url = this.props.url;
        }

        return (
            <div className="userImageContainer">
                <img src={url} className="userImage" />
            </div>
        );
    }
}