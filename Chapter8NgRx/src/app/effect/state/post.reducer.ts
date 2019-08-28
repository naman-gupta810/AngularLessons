import {Action} from '@ngrx/store';
import {Post} from '../model/post.model.ts';

export interface PostState {
  posts: Post[];
}

const initialState = {
  posts: []
};

export function postsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'add':
    default:
      return state;
  }

}
