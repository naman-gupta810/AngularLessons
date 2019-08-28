import {Action} from '@ngrx/store';
import {User} from '../model/user';

export const ADD_USER = '[User] Add User';
export const UPDATE_USER = '[User] Update User';
export const DELETE_USER = '[User] Delete User';
export const START_EDIT_USER = '[User] Start User Edit';
export const STOP_EDIT_USER = '[User] Stop User Edit';

export class AddUserAction implements Action {
  readonly type = ADD_USER;

  constructor(public payload: User) {
  }
}

export class StartEditUserAction implements Action {
  readonly type = START_EDIT_USER;

  constructor(public payload: { editIndex: number }) {
  }
}

export class StopEditUserAction implements Action {
  readonly type = STOP_EDIT_USER;

  constructor() {
  }
}

export class UpdateUserAction implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: { user: User }) {
  }
}

export class DeleteUserAction implements Action {
  readonly type = DELETE_USER;

  constructor(public deleteIndex: number) {
  }
}

export type UserActions =
  AddUserAction
  | UpdateUserAction
  | DeleteUserAction
  | StartEditUserAction
  | StopEditUserAction;
