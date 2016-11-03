import { strictEqual } from 'assert';
export class User {
    public UserName: string;
    public RememberMe: boolean;
}

export class UserAction {
    public InitUser: User;
    public ActionType: string;
    public User: User;
}