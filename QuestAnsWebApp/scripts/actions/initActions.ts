import { LocationHelper } from '../helpers/loactionHelper';
import { UserAction } from '../models/userModels';
import { StringHelper } from '../helpers/stringHelper';
import { browserHistory } from 'react-router';
import { userActions } from './userActions';
import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../constants/actionTypes';

class InitActions {
    public initApp(callback: Function): void {
        userActions.getCurrentUser().then(function (user) {
            let action = new UserAction(ActionTypes.INIT, user, true);

            dispatcher.dispatch(action);

            callback();

            if (LocationHelper.checkLocation(true)) {
                browserHistory.push('/user/' + user.UserName);
            }
        }.bind(this))
            .fail(function () {
                callback();

                if (!LocationHelper.checkLocation(false)) {
                    browserHistory.push('/login');
                }
            }.bind(this));
    }
}

export let initActions = new InitActions();