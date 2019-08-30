import {Post} from '../model/post.model.ts';
import {API_ERROR, CREATE_POST_SUCCESS, GET_POST_SUCCESS, PostActionType} from "./post.action";

export interface PostState {
  posts: Post[],
  error: string
}

const initialState: PostState = {
  posts: [],
  error: ''
};

export function postsReducer(state = initialState, action: PostActionType) {
  switch (action.type) {
    case GET_POST_SUCCESS:
      return {
        ...state,
        posts: [...action.payload]
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case API_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }

}
