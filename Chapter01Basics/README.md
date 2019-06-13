# Angular Basics
Angular is a Single Page Application framework. Here We are describing very basic element of the angular application <b>Component</b>.

## How Angular application loads
Angular application starts with main.ts in which we pass our startup module in bootstrapModule(<module_Name>) method.
Then app.modules.ts(Or may be renamed class by you) contains @NgModule decorator which contains the declaration array
of components, modules and startup bootstrap components used by application. Bootstrap components used to define statup
elements of applications. In simple Flow

main.ts -> app.module.ts -> <Various Components>

```angular2
main.ts

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


app.module.ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

## How to create a component
1. We can create folder then create ts files with <component_name>.component.ts  and create HTML template file for same component.
Then we declare this component in our module in declaration array and if used in startup then add in bootstrap array.

2. Quick method to generate component
<b>ng g c <component_name></b>

    The above method will do all the work mentioned in point 1.
    
3. The created component uses @Component decorator to declare the class as component in which we provide the template location, 
Style locations and most importantly selector.
```angular2
@Component({
  selector: 'app-root',
  templateUrl: home-page.component.html,
  styleUrls: [home-page.component.css]
})
``` 

## Using created component 
The selector from last point is used to use this created component. We put component as HTML tag in our templates which is then 
render our component's template.

A Component can be nested within other components using selectors.
```angular2html
  <app-root></app-root>
```

We have three types of selectors.
* Element Selector
* Attribute Selector
* Class Selector

##### Element Selector
This is similar as shown in above example. It is declared as simples selector in selector array.
Then used as element like <b><app-root></app-root></b>.

##### Attribute Selector
In this we define selector in square brackets within component and use the selector as attribute 
in template files. Ex.
```angular2
@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```
```angular2html
  <div app-root></div>
```

##### Class selector
In this we define selector with "." and use selector as class in template files. Ex.
```angular2
@Component({
  selector: '.app-root',
  templateUrl: home-page.component.html,
  styleUrls: [home-page.component.css]
})
```
```angular2html
<div class="app-root"></div>
```

Selector by ID is not supported till now nor the sudo css selector like hover is also not supported.
We mostly used the element selector, but for the some use cases we can think to go with attribute or
class selector.

## Adding Bootstrap or External CSS to your project
Use below command to add css framework to your project from command prompt or bash.
```
npm install bootstrap
```
Then add path "node_modules/bootstrap/dist/css/bootstrap.min.css" to angular.json styles array.

## Modifying Prefix for angular components and other building blocks
Till now we have seen when we create a component we are using the app as prefix to name of components or
other building blocks, And if we don't use then the tsLint give us error. Now how to change this prefix
as below:
* First we need to change prefix property value in angular.json to name you want.
* Then add value you have changed to tslint.json in directive-selector and component-selector array.

## Data binding
Data binding means the communication between your templates and typescript code (Business logic). 
The user can react only with the templates but on runtime depends on the user input or finish of
any process you want to change something on the templates dynamically, then data binding helps you
on this. We have below types of data bindings.
* String interpolation (Showing data to user)
* Property Binding (Showing data to user using property)
* Event Binding (Capture user events and perform Business logic)
* Two-way Data binding (React to the events and also show the data to user)

##### String interpolation
In this we declare the variables in templates files and then show values to template using string interpolation.
String interpolation syntax is {{<variable_name>}} in template. For this example you can refer 
[server.component.ts](src/app/servers/server/server.component.ts) and [server.component.html](src/app/servers/server/server.component.html).

Any Expression which return string in the end can be used in String interpolation. We can't use multiline expression in this.
We can call the methods as well withing this.


##### Property binding
In this we bind typescript variables with templates. The variables are declared and changed depending on business logic and it's 
changed value will be reflected on the template using property binding. We can bind any variable type to property that accepts that 
particular variable type. For example in [server-list.component.ts](src/app/servers/server-list/server-list.component.ts) 
and [server-list.component.html](src/app/servers/server-list/server-list.component.html) we bind disabled property with boolean variable of the
template allowNewServer.


##### Event binding
This binding is use to react on events. Whenever any events happen some business logic might get execute and change output.
For ex. On above example button click we want to change some text using method. Then we use event binding. Property binding 
use square brackets [] and event binding use round brackets () around property or method. See in example.

To pass the data from an event we can use a variable <b>$event</b> from template which is passed to method. And method extract
the value set it to particular value.

##### Two-way binding 
In two way binding we bind a particular variable to both event and property using banana bracket [()] and directive ngModel.
See Example of two way binding in last example. Also we can see that if value changed in model then it reflects to the template
as well.


#Directives
This is second Key Building block of Angular application. Directives are instruction to DOM. Component are a kind of directive,
which contains the Template with TS code which instructs to DOM to add the template where we put the selector. But there are
directives without template. We can create directive with @Directive decorator, But this we will learn in chapter 4. Right 
now we are going to look some of important built-in directive.
  
  <b>1. ngIf</b>
  
  If we want to show a particular element conditionally then we use this directive. Example below
  ```angular2html
    <p *ngIf="buttonClicked">This will show if and only if button Clicked!</p>
  ```
  
  In case we want to perform if-else operation the syntax will be like below:
  ```angular2html
     <p *ngIf="buttonClicked; else noButtonClicked">This will show if and only if button Clicked!</p>
     <ng-template #noButtonClicked>
        <p>This will show in else if button not clicked!</p>
     </ng-template>
  ```
  In this #noButtonClicked is local reference in the template,we will learn about local references in upcoming chapters.
  ng-template is a component directive which ships with angular and used to mark places in DOM. Then we pass our local 
  reference in the ngIf with else condition and reference to template local variable which will
  be shown if the condition is false.

 <b>2. ngStyle</b>

  Unlike ngIf, ngStyle is attribute directive. ngIf was structural directive, which add or remove
  elements in DOM depending on condition. ngStyle will not add or remove DOM elements, it will apply the 
  attribute properties depending on parameter passed to this. ngStyle takes array of key value pairs, key is style property
  Name and value is the styling value. Ex. [server.component.html](src/app/servers/server/server.component.html)
  ```angular2html
    <p [ngStyle]="{color:getColor()}">This is my server with ID {{ID}} and status {{getServerStatus()}} </p>
  ```

  <b>3. ngClass</b>
  
  ngStyle helps us to style our elements on basis of condition, ngClass helps us to add or remove class on the go like ngStyle.
  Unlike ngStyle the ngClass takes the array of key value pairs, where key contains class name and value contains the expression
  or method which return boolean. if the expression returns true then only it will attach CSS class.
  Ex. [server.component.html](src/app/servers/server/server.component.html)
  ```angular2html
    <p [ngStyle]="{color:getColor()}"
        [ngClass]="{'alert-info':getServerStatus()==='Online'}">This is my server with ID {{ID}} and status {{getServerStatus()}} </p>
  ```
  
   <b>4. ngFor</b>
  
   ngFor is structural directive. We can use this to repeat a element depending on the array or index we want. Like in example below:
   [server-list.component.ts](src/app/servers/server-list/server-list.component.ts) 
   and [server-list.component.html](src/app/servers/server-list/server-list.component.html). 
   
   ```angular2html
      <ul>
        <li *ngFor="let server of servers">
          <lrn-server></lrn-server>
        </li>
      </ul>
  ```
  
  If we want to access index for array then we will use like below:
  ```angular2html
    <ul>
      <li *ngFor="let server of servers; let i = index">
        <lrn-server></lrn-server> <p>{{i}}</p>
      </li>
    </ul
  ```
