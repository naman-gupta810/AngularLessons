import {userReducer, UserState} from '../store/state/user.reducer';
import {postsReducer, PostState} from '../effect/state/post.reducer';
import {ActionReducerMap} from '@ngrx/store';

export const applicationActionReducerMap: ActionReducerMap<AppState> = {
  userStore: userReducer,
  postStore: postsReducer
};

export interface AppState {
  userStore: UserState;
  postStore: PostState;
}
