import { User, UserAction } from '../models/userModels';
import { Store } from './store';
import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../constants/actionTypes';

let user: User = null;

class UserStore extends Store {

    getCurrentUser(): User {
        return user;
    }

    isLoggedIn(): boolean {
        return !!user;
    }
}

export let userStore = new UserStore();

dispatcher.register((action: UserAction): void => {
    switch (action.ActionType) {
        case ActionTypes.UPLOAD_PHOTO:
            user = action.User;
            userStore.emitChange();
            break;

        case ActionTypes.INIT:
            user = action.InitUser;
            userStore.emitChange();
            break;

        case ActionTypes.SIGNIN:
            user = action.User;
            userStore.emitChange();
            break;

        case ActionTypes.SIGNOUT:
            user = null;
            userStore.emitChange();
            break;

        case ActionTypes.USER_UPDATE:
            user = action.User;
            userStore.emitChange();
            break;
            
        case ActionTypes.REGISTER:
            break;
        default: break;
    }
});