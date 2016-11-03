import { browserHistory } from 'react-router';
import { userStore } from '../stores/userStore';

export class Auth {
    public static requireAuth(transition): void {
        if (!userStore.isLoggedIn()) {
            transition.routes.push('/login');
        }
    }

    public static requireNotAuth(transition): void {
        if (userStore.isLoggedIn()) {
            let user = userStore.getCurrentUser();
            browserHistory.push('/user/' + user.UserName);
        }
    }
}