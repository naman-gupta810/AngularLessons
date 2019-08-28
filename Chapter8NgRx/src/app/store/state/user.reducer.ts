import {User} from '../model/user';
import * as UserAction from './user.actions';

export interface UserState {
  users: User[];
  editUser: User;
  editUserIndex: number;
}

const initialState: UserState = {
  users: [new User('Test', 'Test', 'test@test.com')],
  editUser: null,
  editUserIndex: -1
};

export function userReducer(state = initialState, action: UserAction.UserActions) {
  switch (action.type) {
    case UserAction.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case UserAction.START_EDIT_USER:
      return {
        ...state,
        editUserIndex: action.payload.editIndex,
        editUser: {...state.users[action.payload.editIndex]}
      };
    case UserAction.STOP_EDIT_USER:
      return {
        ...state,
        editUserIndex: -1,
        editUser: null
      };
    case UserAction.UPDATE_USER:
      const user = state.users[state.editUserIndex];
      const editedUser = {
        ...user,
        ...action.payload.user
      };
      const updatedUsers = [...state.users];
      updatedUsers[state.editUserIndex] = editedUser;
      return {
        ...state,
        users: [...updatedUsers],
        editUserIndex: -1,
        editUser: null
      };
    case UserAction.DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((val, index) => {
          return index !== action.deleteIndex;
        })]
      };
    default:
      return {...state};
  }
}
