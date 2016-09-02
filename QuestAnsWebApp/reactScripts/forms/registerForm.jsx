var React = require('react');
var Field = require('../components/field.jsx');
var SimpleButton = require('../components/simpleButton.jsx');

class RegisterForm extends React.Component {
    render() {
        return (
                <div>
                    <h1>Register Form</h1>
                    <form>
                        <Field type="email" label="Email" name="Email" value={this.props.user.Email} onChange={this.props.onChange} error={this.props.errors.Email} />
                        <Field label="User Name" name="UserName" value={this.props.user.UserName} onChange={this.props.onChange} error={this.props.errors.UserName}/>
                        <Field type="password" label="Password" name="Password" value={this.props.user.Password} onChange={this.props.onChange} error={this.props.errors.Password}/>
                        <Field type="password" label="Repeat Password" name="RepPassword" value={this.props.user.RepPassword} onChange={this.props.onChange} error={this.props.errors.RepPassword}/>
                        <Field label="Name" name="Name" value={this.props.user.Name} onChange={this.props.onChange} error={this.props.errors.Name}/>
                        <Field label="Surname" name="Surname" value={this.props.user.Surname} onChange={this.props.onChange} error={this.props.errors.Surname}/>
                        <SimpleButton text="Register" cssClasses="success" onClick={this.props.onSave} />
                    </form>
                </div>
            );
    }
}

module.exports = RegisterForm;