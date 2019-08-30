import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from "../../common/application-store-manager";
import {Store} from "@ngrx/store";
import {CreatePostStartAction, GetPostStartAction} from "../state/post.action";
import {Post} from "../model/post.model.ts";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-fake-posts',
  templateUrl: './fake-posts.component.html',
  styleUrls: ['./fake-posts.component.css']
})
export class FakePostsComponent implements OnInit {

  @ViewChild('titleForm', {static: true}) form: NgForm;
  posts: Post[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('postStore').subscribe(state => {
        this.posts = state.posts;
      }
    );
    this.store.dispatch(new GetPostStartAction());
  }

  createPost() {
    this.store.dispatch(new CreatePostStartAction(this.form.value));

  }
}
