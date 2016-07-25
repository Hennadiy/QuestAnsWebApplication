class EditUserForm extends React.Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            cities: []
        };
    }

    componentWillMount() {
        //todo
    }

    render() {
        <form>
            <Field label="Name" name="Name" value={this.props.user.Name} onChange={this.props.onChange} />
            <Field label="Surname" name="Surname" value={this.props.user.Surname} onChange={this.props.onChange} />
            <Dropdown label="Country" name="Country" value={this.props.user.Country} values={this.state.countries} onChange={this.props.onChange} />
            <Dropdown label="City" name="City" value={this.props.user.City} values={this.state.cities} onChange={this.props.onChange} />
            <Field label="Skype" name="Skype" value={this.props.user.Skype} onChange={this.props.onChange} />
            <Field label="Phone Number" name="PhoneNumber" value={this.props.user.PhoneNumber} onChange={this.props.onChange} />
            <SimpleButton text="Save" onClick={this.props.onSave} />
        </form>
    }
}