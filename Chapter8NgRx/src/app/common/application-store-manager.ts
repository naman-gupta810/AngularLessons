import {UserState} from '../store/state/user.reducer';

export interface ApplicationStoreManager {

}

export interface AppState {
  userStore: UserState;
}
