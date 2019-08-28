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
Also Let's see how to define multiple stores and use it our applications.
