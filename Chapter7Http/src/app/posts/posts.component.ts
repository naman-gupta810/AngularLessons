import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Post} from '../post';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostsService) {
  }

  @ViewChild('postForm', {static: true}) postForm: NgForm;

  posts: Post[] = [];
  isFetching = false;
  errorMessage = '';

  ngOnInit() {
    this.getAllPosts();
  }

  savePost() {
    this.postService.createNewPost(this.postForm.value);
  }

  getAllPosts() {
    this.isFetching = true;
    this.postService.getAllPosts().subscribe(posts => {
      this.isFetching = false;
      this.posts = posts;
    }, error => {
      this.isFetching = false;
      this.errorMessage = error.message;
    });

  }

  clearAllPosts() {
    this.postService.deleteAllPosts();
  }

}
