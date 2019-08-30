import {Action} from "@ngrx/store";
import {Post} from "../model/post.model.ts";

export const GET_POST_START = '[Post] Get Post Start';
export const CREATE_POST_START = '[Post] Create Post Start';
export const GET_POST_SUCCESS = '[POST] Get Post Success';
export const CREATE_POST_SUCCESS = '[Post] Create Post Success';
export const API_ERROR = '[Post] Post API Error';

export class GetPostStartAction implements Action {
  readonly type = GET_POST_START;

  constructor() {
  }
}

export class CreatePostStartAction implements Action {
  readonly type = CREATE_POST_START;

  constructor(public payload: { title: string }) {
  }
}

export class CreatePostSuccessAction implements Action {
  readonly type = CREATE_POST_SUCCESS;

  constructor(public payload: Post) {
  }
}

export class GetPostSuccessAction implements Action {
  readonly type = GET_POST_SUCCESS;

  constructor(public payload: Post[]) {
  }
}

export class ApiErrorAction implements Action {
  readonly type = API_ERROR;

  constructor(public payload: string) {
  }
}

export type PostActionType =
  GetPostStartAction
  | CreatePostStartAction
  | CreatePostSuccessAction
  | GetPostSuccessAction | ApiErrorAction;
