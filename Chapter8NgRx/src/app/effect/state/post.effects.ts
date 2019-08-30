import {Actions, Effect, ofType} from "@ngrx/effects";
import {
  ApiErrorAction,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CreatePostStartAction,
  CreatePostSuccessAction,
  GET_POST_START,
  GetPostSuccessAction
} from "./post.action";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Post} from "../model/post.model.ts";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class PostEffects {

  @Effect()
  getpost = this.actions.pipe(ofType(GET_POST_START),
    switchMap(() => {
      return this.http.get('https://my-json-server.typicode.com/typicode/demo/posts').pipe(
        map(response => {
          return new GetPostSuccessAction(response as Post[]);
        }),
        catchError(err => {
          return of(new ApiErrorAction(err))
        })
      );
    }),
  );

  @Effect()
  createPost = this.actions.pipe(ofType(CREATE_POST_START),
    switchMap((data: CreatePostStartAction) => {
      return this.http.post('https://my-json-server.typicode.com/typicode/demo/posts', data.payload).pipe(
        map(response => {
          return new CreatePostSuccessAction(response as Post);
        }),
        catchError(err => {
          return of(new ApiErrorAction(err))
        })
      );
    })
  );

  @Effect({dispatch: false})
  createSuccess = this.actions.pipe(ofType(CREATE_POST_SUCCESS), tap(() => {
      this.router.navigate(['/']);
    }
  ));


  constructor(private actions: Actions, private http: HttpClient, private router: Router) {
  }
}
