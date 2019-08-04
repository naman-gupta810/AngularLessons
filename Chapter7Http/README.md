# Chapter 7 HTTP

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

We generally don't keep HTTP calls in our component, we create services for that and then use that in component, This
makes our code cleaner and more maintainable. We had done with sample project in this repository.


Now we will learn how to handle errors, server always not set 200 OK, or success response. Sometimes server send 401 or other status
as well, and sometime error object as well. So we will learn how to handle those scenarios with Angular HTTP library.

**Method 1:** 
Handle error in the Observable. We can pass second argument in the observable so that It can get error and do useful with it. Like below:
```angular2
this.postService.getAllPosts().subscribe(posts => {
      this.isFetching = false;
      this.posts = posts;
    }, error => {
      this.isFetching = false;
      this.errorMessage = error.message;
    });
```

**Method: 2**
For this we can create and error subject and can subscribe to it in component. We can use this to generate error message and inform to component which 
will update UI for the message.


We also have the catchError and throwError function to do custom error handling. The catchError is RxJS function which can be be used in pipe to perfrom some
task and then throwError is a Observable which will wrap our error or custom created error and throw it. Like below:
```angular2
this.postService.getAllPosts().subscribe(posts => {
      this.isFetching = false;
      this.posts = posts;
    }, error => {
      this.isFetching = false;
      this.errorMessage = error.message;
    });
```
 
We have learned how to send request, Now we will learn about setting headers, parameters in request. Let's see how to add headers to request.
For adding header we need to pass the array in second or third argument depending on the request takes the request body, If request has the 
request body then it is as third parameter else it will second parameter of the request. Let's see an example how we can add header:
```angular2
 return this.http.get<{ [key: string]: Post }>('https://angularpro-8a8ca.firebaseio.com/post.json',
      {
        headers: new HttpHeaders({SampleKey: 'SampleValue', SampleKey1: 'SampleValue1'})
      })
``` 

Now we will learn to add queryParameters in the URL. Like headers we will pass another parameter with params and an Object of HttParams. Below is code 
for the same:
```angular2
let queryParams = new HttpParams();
    queryParams = queryParams.append('print', 'pretty');
    queryParams = queryParams.append('SampleParam', 'Samplevalue');
    return this.http.get<{ [key: string]: Post }>('https://angularpro-8a8ca.firebaseio.com/post.json',
      {
        headers: new HttpHeaders({SampleKey: 'SampleValue', SampleKey1: 'SampleValue1'}),
        params: queryParams
      })
```

To get a better control over the response we can use the arguments and can take control over the response and their use. We can use
it for different kind of response we get from server. Like if we are getting error then we can parse that. Below is example for the
same:
```angular2
this.http.post('https://angularpro-8a8ca.firebaseio.com/post.json', post, {
      observe: 'response'
    }).subscribe((responseData) => {
      console.log(responseData);
    });
```
This will give us complete HttpResponse object, which contains status, body and headers. Then we will use this to parse object. By default it return the body
of the response that we convert into the object, But getting over the control gives you better opportunity to parse the response and 
get the proper output to user. 

Also we can show the upload and download progress when we change the observe to events. Events contains the zdifferent lifecycle of request like sent, got 
response, uploading and downloading. Depending on the event type you can provide better response to user. 
```angular2
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
    }))
```  

For downloading a file we need to change the response type to blob we can pass that in options array of request method.

We have scenario where we need to add token to every request. To do that we need to work with interceptor, which will edit request before leaving
your application. Let's look this in practice. 

```angular2
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Sending request');
    const modifiedRequest = req.clone({headers: req.headers.append('InterceptedKey', 'InterceptedValue')});
    return next.handle(modifiedRequest);
  }
```

The HTTPRequest are immutable so we need to clone and need to pass the modification array to change cloned request.
To intercept request we need to register our interceptor class with the AppModule providers array. We will do this like 
below:
```angular2
providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
```

Till now we have added the request interceptor, Now we will look the response interceptor. We generally don't touch the 
response it is not in recommended practice. But there are some usecases for which we need to modify the response before
it reach to service. So We can do that using the observable pipe operator and passing the response. For this example we 
are logging response data. So do this we use tap operator of the RxJS.

We can have multiple interceptor and that can be provided in providers array. Just keep in the mind the order of 
interceptor matters. The interceptors will be executed in the order they have provided. That covers all of the HTTP
package that is needed for build an application.
