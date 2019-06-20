# Chapter 3 Directives
In this section we are going to learn more about directive. We will revise some of directives
we have looked then we will look how to build our own directives. There are two types of directives
* Attribute Directive
  * This looks like normal HTML attribute
  * This only affect the element on which we put it into, It will just change the element properties
  or styles whichever applicable
* Structural Directive
  * This looks like normal HTML attribute with leading asterisk(*) 
  * Affect the whole area of DOM, It can add or remove elements in DOM

Let's look some of built-in directives
 * *ngFor - Structural directive to iterate through array
 * *ngIf - Structural directive, show block conditionally
 * ngClass - Attribute directive, to add the class conditionally. Ex. [ngClass]="{class_name: boolean_condition}"
 * ngStyle - Attribute directive, to style element conditionally. Ex. [ngStyle]="{style_name: string_value return on condition}"
 
## Custom Attribute Directive
For creating custom directive we need to create typescript class and add @Directive decorator, we need to provide
selector to decorator which will be used to put as attribute on the component we want to apply. Below are steps to
build directive:
  * Make a class with @Directive decorator and declare in the module.
  * Since we want to make some changes on the element we will inject reference of element in this class
  * Till steps 2 Demo Ex. [basic-highlight.directive.ts](src/app/custom-directives/basic-highlight.directive.ts)
  * In the demo we injected elementReference and changed it's background color to yellow.
  * It is not good practice to use ElementRef as to access native component and change them instead of we are going
  with different approach below.
  * To generate directive from CLI we use 'ng g d <directive_name>'.
  * We are going to use Renderer2 class for this to change style, add class or perform something on the element
  on which our directive sits.
  * Ex. for above renderer is Ex. [refactored-highligter.directive.ts](src/app/custom-directives/refactored-highligter.directive.ts)


Till now we have styled element using our directive, but it is now kind of very static. If we want to apply styling like 
hover event, loading image on button click. So we can use HostListener Decorator within our directive and change style on
the element. Ex. [reactive-directive.directive.ts](/src/app/custom-directives/reactive-directive.directive.ts)


There is one more way to work with element instead of the Renderer, we will use @Hostbinding decorator, which takes the 
property you want to change. Ex. [reactive-directive.directive.ts](/src/app/custom-directives/reactive-directive.directive.ts)
So, In example you can see background-color is set by renderer and for text-color we use @Hostbinding.


Till now we have seen directives which styles the element, but it is too static, we are not taking any input on element.
Now we will use this value to while applying style. Like Component we can use property binding to take input for directives.
Then we will pass the data using property binding, and send the value to directive using property binding value. Ex.

## Custom Structural Directive
Before create our own custom structural directive. Let's have a look what is behind the scene works when we use structural
directive.

#### What is meaning of asterisk in structural directive
Behind the scene asterisk is used to property bind the element in ng-template. So when we put the *ngIf=<some_condition> 
it translate to <ng-translate [ngIf]="<some_condition><inner_content_of_if/></ng-translate>.


Since Now we understand how to build structural directive. Just like attribute directive create class and use decorator
@Directive for this. Then we use setter operation on input to execute method on value change of input. The input name 
should be same as the directive name. To project content in the template we get two reference first is TemplateRef which
contains the view which need to be projected, second we get ViewContainerRef which contains the reference to place where
this template need to be project.
```angular2html
<div *appReverseIf="onlyOdd">
``` 
```angular2

@Directive({
  selector: '[appReverseIf]'
})
export class ReverseIfDirective {
  @Input() set appReverseIf(condition: boolean) {
      if (!condition) {
        this.vcRef.createEmbeddedView(this.templateRef);
      } else {
        this.vcRef.clear();
      }
  }
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
```

