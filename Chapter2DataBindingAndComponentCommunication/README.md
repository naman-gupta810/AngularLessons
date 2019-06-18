# Chapter2 Data Binding And Component Communication
In this chapter we will learn data binding and component communication. We start with all
logic in root component and then we start segregation of components and passing data
from one component to other component.

### Property and Event Binding
To communicate or pass the data between components we use property binding and event binding
To pass the data we create our own property and bind the data to it, as we did in Chapter 1
and then we create our own event and bind it to event.

#### Property binding
By default all variables of a component is visible to that component only. If we want to expose
any property or variable for property binding then we need to use @Input() decorator on that
particular property. Ex.
[server-view.component.ts](/src/app/server/server-view/server-view.component.ts)

In above component we expose the element property, by putting @Input() over it. Then to bind
it we used square bracket and pass the value. 
[chapter2-root.component.html](/src/app/chapter2-root.component.html)


#### Event Binding
Till now we have seen property binding to bind data to property or variable of class. This will
pass data to class, now we learn other direction i.e. passing data on event to parent component
or the component within it contained. To emit a event we need to do below steps:
  * Create variables with the name of event you want to expose.
  * Use @Output decorator to expose them as event.
  * Your variable in step 1 should be of type EventEmitter.
  * Assign new variable to variables.
  * Now to emit event we use EventEmitter emit method and pass the data we want to pass
  as part of event.
  
Ex. [server-form.component.ts](/src/app/server/server-form/server-form.component.ts)

[chapter2-root.component.html](/src/app/chapter2-root.component.html)

[chapter2-root.component.ts](/src/app/chapter2-root.component.ts)

#### Issue with Data and Event binding
When we are passing the data using data or event binding then this chain grows depends on the
distance of two component to each other. For Ex. if a component sit net to each other. Then we
need to pass the data to parent component from one component and then parent will pass data to
other component. So this will grow up, to resolve this we will use services in upcoming next 
chapters. But for simple use cases like this, Data binding and Event binding is better approach.
Now we will use these technique to our course project and practice them.

### View Encapsulation
Angular provides view encapsulation, which helps us to design better components. Due to this view
encapsulation the styling is applied to component on which it is define, it will not apply to child
or parent component of it. For global styling we use stylesheet which we import using angular.json
file. We can override in component by adding property in @Component decorator, with name encapsulation
and value from ViewEncapsulation class which is None which means that the style will apply globally
then Emulated is default one which we have, Native i.e. browser native styling. But we rarely want to 
override it.

### Local references in template
