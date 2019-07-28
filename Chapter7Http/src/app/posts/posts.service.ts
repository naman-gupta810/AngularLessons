import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from '../post';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  createNewPost(post: Post) {
    this.http.post('https://angularpro-8a8ca.firebaseio.com/post.json', post, {
      observe: 'response'
    }).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  getAllPosts(): Observable<Post[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('print', 'pretty');
    queryParams = queryParams.append('SampleParam', 'Samplevalue');
    return this.http.get<{ [key: string]: Post }>('https://angularpro-8a8ca.firebaseio.com/post.json',
      {
        headers: new HttpHeaders({SampleKey: 'SampleValue', SampleKey1: 'SampleValue1'}),
        params: queryParams
      }).pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }), catchError(err => {
        // handle err and then do whatever you want
        return throwError(err);
      })
    );
  }

  deleteAllPosts() {
    this.http.delete('https://angularpro-8a8ca.firebaseio.com/post.json', {
      observe: 'events'
    }).pipe(tap(data => {
      console.log(data);
      if (data.type === HttpEventType.Sent) {
        console.log('Request has been sent');
      }
      if (data.type === HttpEventType.Response) {
        console.log('Response Received');
      }
    })).subscribe(responseData => {
      console.log(responseData);
    });
  }

}
