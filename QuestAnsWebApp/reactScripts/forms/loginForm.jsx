var React = require('react');
var Field = require('../components/field.jsx');
var SimpleButton = require('../components/simplebutton.jsx');
var Checkbox = require('../components/checkbox.jsx');

class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <h1>Login Form</h1>
                <form>
                    <Field label="Login" name="UserName" required="true" value={this.props.user.UserName} onChange={this.props.onChange} error={this.props.errors.UserName} />
                    <Field type="password" name="Password" label="Password" required="true" value={this.props.user.Password} onChange={this.props.onChange} error={this.props.errors.Password}/>
                    <Checkbox label="Remember Me" name="RememberMe" value={this.props.user.RememberMe} onChange={this.props.onChange} />
                    <SimpleButton text="Log In" onClick={this.props.onSave} />
                </form>
            </div>
      );
    }
}

module.exports = LoginForm;
