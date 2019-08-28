import {Action} from '@ngrx/store';
import {User} from '../model/user';

export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const START_EDIT_USER = 'START_EDIT_USER';
export const STOP_EDIT_USER = 'STOP_EDIT_USER';

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

  constructor(public payload: { editIndex: number, user: User }) {
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
