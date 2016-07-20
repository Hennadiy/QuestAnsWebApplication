class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <h1>Login Form</h1>
                <form>
                    <Field label="Login" name="UserName" required="true" value={this.props.Login} onChange={this.props.onChange} error={this.props.errors.UserName} />
                    <Field type="password" name="Password" label="Password" required="true" value={this.props.Password} onChange={this.props.onChange} error={this.props.errors.Password}/>
                    <Checkbox label="Remember Me" name="RememberMe" value={this.props.RememberMe} onChange={this.props.onChange} />
                    <SimpleButton text="Log In" onClick={this.props.onSave} />
                </form>
            </div>
      );
    }
}
