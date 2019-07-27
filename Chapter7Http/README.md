# Chapter 7 HTTP, Authentication and Route Protection

## HTTP
Till chapter 6 we have learned about lot of components services, froms, pipes etc., But till now we are keeping
our data in browser memory, whenever the app loads the data will be lost. Now in this section we will learn to 
interact with backend webservices which keep data in a permanent storage like database. So we will learn how to 
perform CRUD operation on data persisted in backend and transform data as per our Angular application need.

To call the HTTP request we need to import HttpClientModule in our AppModule. For calling an httpService we need
to inject the HttpClient service in component. Every REST url is an Observable, so we need to subscribe for the 
response data. Below is call for saving post in our example.
```angular2
 savePost() {
    this.http.post('https://angularpro-8a8ca.firebaseio.com/post.json', this.postForm.value).subscribe((responseData) => {
      console.log(responseData);
    });
  }
```

The above save the data in firebase console. Now we will make get call for initializing the posts and listing them.
Also sometime we need to transform the response to make it properly parseable. For this since every call is an observable
we can pipe through the RxJS operators and then we can use it as we want. Like right now the format from the API contains 
id as attribute and data contains as value of this attribute. The conversion for angular compatible JSON is done in map function
like below:
```angular2
fetchPosts() {
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
      }
    );
  }
```

We can also put the loading symbol while we fetch the data on the button, using below technique. To demonstrate that API takes time
to return, we are using setTimeout function.
```angular2
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
```
And HTML file, we will do below changes:
```angular2html
<button type="button" class="btn btn-primary mr-2" [disabled]="isFetching" (click)="getAllPosts()">Get all posts
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" *ngIf="isFetching"></span>
</button>
```


 




## Authentication and Route Protection

