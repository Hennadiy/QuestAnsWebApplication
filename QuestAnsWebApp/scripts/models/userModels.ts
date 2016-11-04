import { Value } from './commonModels';

export class User {
    constructor() {
        this.UserName = '';
        this.Name = '';
        this.Surname = '';
        this.Country = new Value();
        this.City = new Value();
    }

    public UserName: string;
    public Name: string;
    public Surname: string;
    public Email?: string;
    public Skype?: string;
    public PhoneNumber?: string;
    public PhotoUrl?: string;
    public Birthdate?: Date;
    public CityId?: number;
    public City?: Value;
    public CountryId?: number;
    public Country?: Value;
    public RememberMe: boolean;
}

export class UserAction {
    constructor(actionType: string, user: User, isInit: boolean) {
        this.ActionType = actionType;

        if (isInit) {
            this.InitUser = user;
        }
        else {
            this.User = user;
        }
    }
    public InitUser?: User;
    public ActionType?: string;
    public User?: User;
}