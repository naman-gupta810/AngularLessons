#NgRx
NgRx is developed by Angular developers to solve some problems we may face during development of
bigger application like state management,

## State Management with NgRx
While reading this topic first thought comes why we need NgRx, we are already doing state management
with application we developed as part of course project using Subject and Observables.

We can do state management as we are doing, but for large application it can be a problem because 
the subscriber and observer state will be lost after reload which can be resolved from backend storage
Apart from that every developer has it's own preferences to declare and use the Subject and Observable.
Apart from that below are fixes which NgRx provide with it's State Management.
* State can be updated from anywhere.
* State is possibly mutable.
* Handling side effects like HTTP calls is unclear. Like where to call state change whether it should
in the service or component. 
* In Bigger application we can't enforce best practices for state management as angular don't provide.

So with NgRx we are going to solve these problems.

Redux is pattern which solve these problems. Let's understand what is Redux pattern. Below diagram gives a
high level understanding of the pattern.

![Redux Pattern](./src/assets/img/Redux%20Pattern.png)

In the diagram the state is store in central application store, which provides state to component and state.
When we want change state we emit action with data which is optional to pass, which is then computed by a
javascript function which reduces/combine the state with stored one in application store and then it saves
reduced state to application store immutably.

NgRx implements this Redux pattern. It provides deep integration with Angular, in Typescript and also provide
solution to complicated state management from like HTTP calls.a

In initial commit of this chapter we have simple example in which we are adding the email and reflecting on
the GUI. Now we will use NgRx to sync changes form to list.

Let's learn how to install and use NgRx Store.

### Installing and using ngRx Store 

To install NgRx we need to use below command.
```
npm install --save @ngrx/store
```

After installing we will start writing our reducer method then actions. And then we dispatch actions.
Let's look how to write reducer.

We will export method which takes two argument, first argument is current state and second argument is
action. This method is used by NgRx, so we will not take additional argument. And after finding which
action it is, it returns a new state. This is keep in my mind the state return by this method is 
immutable, i.e. we cannot use same state object while returning. When we are running our application
first time we need to initialize our initial state. Like below:

```angular2
const initialState = {
  users: [new User('Test', 'Test', 'test@test.com')]
};

export function userReducer(state = initialState, action) {}
```

Now let define actions, and then handle it in reducer with switch statement. Define actions which
implements Action from ngRx\Store package. To define actions we will create new package and define
like below:
```angular2

export const ADD_USER = 'ADD_USER';

export class AddUser implements Action {
  readonly type = ADD_USER;

  constructor(public payload: User) {
  }
}
```

Till this time we created elements required to manage store, but to initialize we need to import
StoreModule and initialize the reducer within store. Like below:
```angular2
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({user: userReducer})
  ]
```
Now we are going to use this store. To use this store we need to inject this in class like below:
```angular2
users: Observable<{ users: User[] }>;

  constructor(private store: Store<{ userStore: { users: User[] } }>) {
  }

  ngOnInit() {
    this.users = this.store.select('userStore');
  }
```
We injects our store, and get observable which we consumed using async pipe and used the users array.
If we want to add the user then we will use the store like below:
```angular2
 constructor(private store: Store<{ userStore: { users: User[] } }>) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.isEditMode) {
    } else {
      this.store.dispatch(new AddUserAction(this.form.value));
    }
    this.isEditMode = false;
    this.form.reset();
  }
```

Now define multiple actions like edit and delete case and enhance our reducer to handle these cases.
Also Let's see how to define multiple stores and use it our applications. When we have multiple propeties
in our store state like below:
```angular2
const initialState= {
  users: [new User('Test', 'Test', 'test@test.com')],
  editUser: null,
  editUserIndex: -1
};
```

Then we define an interface other we need to declare this type whenever we inject Store. To manage this
first we create a state of the User like below:
```angular2
export interface UserState {
  users: User[];
  editUser: User;
  editUserIndex: number;
}

const initialState: UserState = {
  users: [new User('Test', 'Test', 'test@test.com')],
  editUser: null,
  editUserIndex: -1
};
```

Now still in the store injection declaration we need to provide {userStore: UserState}, to avoid such a long syntax
again we create an interface and we will append our upcoming stores in this interface which is used as Type
while injecting store. Like below:
```angular2
export interface AppState {
  userStore: UserState;
}
``` 
```angular2
constructor(private store: Store<AppState>) {
  }
```
As you can see in above blocks the injection for the store becomes easy. Now Let's get rid of reducer declartion
in module and put that in a class. Like we are creating one more store. 
```angular2
export const applicationActionReducerMap: ActionReducerMap<AppState> = {
  userStore: userReducer,
  postStore: postsReducer
};

export interface AppState {
  userStore: UserState;
  postStore: PostState;
}
```
```angular2
 imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(applicationActionReducerMap)
  ],
```

As dispatch action approach to each reducer we have some best practices to follow, maintain unique name
so we use *[function] operation*, so it will maintain uniqueness of Action.

### Handling side effects
Let's understand what is side effect. Side effect is basically parts of code which we run in our application
but which is not so important to immediate update of UI. Like HTTP calls we made, but UI can be updated when
we get response or error only. So if we can see HTTP calls can be break in three steps calling the API, 
getting the success or getting the error. So like we are segregating  the responsibilities for like the 
sending the request does not matter what will be the response or success and error response have anything 
relate to sending the request. Use below command to add ngRx\effects in your project:
```
npm install --save @ngrx/effects 
```  

Lets's create our first effect. FOr this first we create a class and import actions from ngrx/effects, and we inject
that like below:
```angular2
export class PostEffects {
  constructor(private actions: Actions, private http: HttpClient) {
    }
}
``` 

Now to register our new effect we will call pipe in actions which gives a series of action, with this pipe we will check
the action type using ofType operator in which we pass the Action name which we created in actions file, and now this
effect will catch this action and sends a request to remote server using switchMap operator. Now we need to handle deal 
with SUCCESS or FAILURE part of the response, which we will do in reducer. So from this observable we will dispatch 
another action which will captured by reducer. So we will pipe the observable we will chain the action depends on the response.
So our effects look like Below:
```angular2
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
```

To register our effect @effect decorator is necessary, also for the injecting our actions and http we need @Injectable on the class.
After writing all of our effects, reducer and action. We need to register this with appmodule like below:
```angular2
 imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(applicationActionReducerMap),
    EffectsModule.forRoot([PostEffects])
  ],
```

So this covers most of the effects and store. Attached application with this chapter provides a bit of idea how you implement.
[post.action.ts](src/app/effect/state/post.action.ts)

[post.effects.ts](src/app/effect/state/post.effects.ts)

[post.reducer.ts](src/app/effect/state/post.reducer.ts)

Special situation handling, like after save routing to other URL can be handled using effect.
Like after save you can catch effect and do the operation within the tap operator. Also
since we are not forwarding any action we need to notify NgRx effect by putting dispatch 
attribute to false, like below:
```angular2
 @Effect({dispatch: false})
  createSuccess = this.actions.pipe(ofType(CREATE_POST_SUCCESS), tap(() => {
      this.router.navigate(['/']);
    }
  ));
```

We have more packages in NgRx, but instead of going each these two were most commonly used packages. 
As our our application get bigger sometimes we need some debug, for that we need to install two things
first is ngrx package and one is redux browser extension, For chrome I am listing below:
```angular2
npm install @ngrx/store-devtools --save
```
Above install package in your application you need to include module in your AppModule.
Now we have to install below plugin which gives us detailed state information.


https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

