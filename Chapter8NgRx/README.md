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

![Redux Pattern](/src/assets/img/Redux%20Pattern.png)

In the diagram the state is store in central application store, which provides state to component and state.
When we want change state we emit action with data which is optional to pass, which is then computed by a
javascript function which reduces/combine the state with stored one in application store and then it saves
reduced state to application store immutably.

NgRx implements this Redux pattern. It provides deep integration with Angular, in Typescript and also provide
solution to complicated state management from like HTTP calls.a

Let's learn how to install and use NgRx Store.



