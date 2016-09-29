var React = require('react');

class DisplayUserImage extends React.Component {
    render() {
        var url = "http://foryouindia.com/Default/Pages/Images/Profile.png";

        if (this.props.url) {
            url = this.props.url;
        }

        return (
            <div className="userImageContainer">
                <img src={url} className="userImage"/>
            </div>
            );
    }
}

module.exports = DisplayUserImage;