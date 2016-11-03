import { StringHelper } from '../helpers/stringHelper';
import { browserHistory } from 'react-router';
import { userActions } from './userActions';
import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../constants/actionTypes';

class InitActions {
    public initApp(callback: Function): void {
        userActions.getCurrentUser().then(function (user) {
            dispatcher.dispatch({
                actionType: ActionTypes.INIT,
                initData: {
                    user: user
                }
            });

            callback();

            if (this.checkLocation(true)) {
                browserHistory.push('/user/' + user.UserName);
            }
        }.bind(this))
            .fail(function () {
                callback();

                if (!this.checkLocation(false)) {
                    browserHistory.push('/login');
                }
            }.bind(this));
    }

    public checkLocation(checkRoot: boolean): boolean {
        let path = location.pathname.toLowerCase();
        if (path === "/" && checkRoot) {
            return true;
        }

        let locations = ["/login", "/register"];

        for (var i = 0; i < locations.length; i++) {
            if (StringHelper.startsWith(path, locations[i].toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}

export let initActions = new InitActions();