import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Post} from '../post';
import {HttpClient} from '@angular/common/http';
import {map, timeout} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  @ViewChild('postForm', {static: true}) postForm: NgForm;

  posts: Post[] = [];
  isFetching = false;

  ngOnInit() {
    this.fetchPosts();
    setTimeout(() => {
      this.postForm.setValue({
        title: 'Sample title',
        content: 'Sample Content'
      });
    }, 1000);
  }

  savePost() {
    this.http.post('https://angularpro-8a8ca.firebaseio.com/post.json', this.postForm.value).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  fetchPosts() {
    this.isFetching = true;
    setTimeout(() => {
      this.http.get<{ [key: string]: Post }>('https://angularpro-8a8ca.firebaseio.com/post.json').pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        })
      ).subscribe(
        (responseData) => {
          this.posts = responseData;
          this.isFetching = false;
        }
      );
    }, 2000);
  }

  getAllPosts() {
    this.fetchPosts();
  }
}
