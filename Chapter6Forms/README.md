# Forms
Angular Forms library provide a way to connect your logic(.ts file) with your form inputs. Also we
need to validate input and change visualization depending on the validation and other properties.
Angular form library provide these thing to us. There are two way of building a form in Angular
  * Template Driven Approach - In this approach Angular infers the Form Object from DOM, we will
    work on DOM and attach that to TS file.
  * Reactive Approach - Form is created programmatically and the Form, once they are in place
    we will connect them manually, which gives us fined grained control on our forms.
 
 
In this section of course, We will first see the both the approach and then in Syntax comparison section
we will cover a table which contains function with the syntax used in both the Approach:


We will start by designing same form in template. We are commiting same as first commit for this chapter.

## Template Driven Approach
Before working with the Template driven file we need to import the FormsModule form 'angular/core' in our 
appModule to enable form support from Angular. So we will include that and start ahead with form.


When we include the FormModule, Angular will automatically scans form and create an object of that form.
But to add controls(inputs) in from we need to use a attribute and to access the form we need to declare
variable. The attribute we need to add on the controls is ngModel, if we don't want binding between any
variable and input, then ngModel without any brackets are enough. But still we need to give name to control,
the name of can provided by HTML name property. The HTML name will taken in account by the form while building
JSON object of form. Since our controls are registered, now we have to submit the form and see what data is
going to submit by the form on click of submit button. To submit the form we will use ngSubmit binding to form
that will take care of submission of the form using logic defined in ts file. To access form Object we need to
define variable in form. In template Driven approach whatever we perform we need to done from template side
and then we will make minimum changes in ts to get elements and process it. So now for accessing the form
we will declare the variable in template file with name f. But this will pass the tag, we need access to object
which is created by the angular for this form. To access that object we need to declare variable like **#f="ngForm"**
which will be assign the ngForm type, gives access to form object to variable f.


Till now we have added control in angular form object and access the ngForm object using local variable, then we
are passing this to ngSubmit. Now understand what Angular does for us by providing this object and on the DOM.
The ngForm object contains the form data in value property, but it also contains other metadata about the form
like form is valid or not, it is getting edited by the user or not within this object well. We can say this 
as state of the form. Also this will append some CSS classes to form as well as controls to identify the state
of the form or it's control. Below is example of form object and form presented in browser.
```angular2
status: "VALID"
statusChanges: EventEmitter
touched: true
untouched: false
valid: true
value: Object
    email: "naman.aasaan@gmail.com"
    secretQuestion: "pet"
    userName: "100924327570"
```
```angular2html
<input _ngcontent-wlk-c1="" class="form-control ng-valid ng-dirty ng-touched" 
    id="username" name="userName" ngmodel="" placeholder="UserName" type="text" 
    ng-reflect-name="userName" ng-reflect-model="">
``` 

As you can see the form object contains the form state is valid, touched or not and the input contains extra classes
like ng-valid,dirty then we can use these to validate our form moving ahead. Below are states which we have for Angular
input state:
  * untouched - The field has not been touched yet
  * touched - The field has been touched
  * pristine - The field has not been modified yet
  * dirty - The field has been modified
  * invalid - The field content is not valid
  * valid - The field content is valid


Right now we are accessing the form object and passing it to submit method, We can have direct access to form in ts file
by @ViewChild.
```angular2
@ViewChild('f', {static: true}) signupForm: NgForm;
```

Now we will add validation on the fields. Like the ngForm every ngControl contains the property like valid, touched and dirty
and we can use of these properties to add validation to form. To add validation we need ngModel and then access property like 
below:
```angular2html
 <div class="form-group">
    <label for="mail">Email</label>
    <input type="email" class="form-control" id="mail" placeholder="Email" name="email"
           ngModel required email #email="ngModel"
           [ngClass]="{'is-invalid':(email.invalid && email.touched),
                    'is-valid': (email.valid && email.touched)}">
    <div class="invalid-feedback">Please Enter a valid E-mail</div>
  </div>
```
In the above code we got the email model in email variable and then we check if the email is invalid then adding the class and 
that will trigger the 'invalid-feedback' to show. 


Now we will learn how to set default value of the formControl or Input. To set default value we will use property binding
and then set default value in it. Ex.
```angular2html
<select class="form-control" id="secretQuestion" name="secretQuestion" [ngModel]="defaultQuestion">
      <option value="pet">Your First Name?</option>
      <option value="school">Your last School Name?</option>
      <option value="maidenName">Your mother maiden Name?</option>
    </select>
```
When we want to show the response as well then we will add two way binding like below:
```angular2html
  <div class="form-group">
    <label for="secretAnswer">Answer</label>
    <input type="text" class="form-control" id="secretAnswer" placeholder="Secret Question Answer" name="secretAnswer"
           [(ngModel)]="secretAnswer" required secretAnswer>
    <div class="text-muted">Your secret answer is : {{secretAnswer}}</div>
  </div>
```

Now since we are using the template driven approach, sometimes we want value be grouped together and a JSON object. 
It that case we need to put the formControls in a div and that should contain the directive ngModelGroup, we can get
the formGroupControl value and state by assigning it key mentioned in value object of form. Ex.:
```angular2html
  <div id="user-data" ngModelGroup="userData" #userData='ngModelGroup'>
    <div class="form-group">
      <label for="username">User Name</label>
      <input type="text" class="form-control" id="username" placeholder="UserName" name="userName"
             ngModel required
             [ngClass]="{'is-invalid':(userName.invalid && userName.touched),
                    'is-valid': (userName.valid && userName.touched)}" #userName="ngModel">
      <div class="invalid-feedback">Please Enter valid username</div>
    </div>
    <button type="button" class="btn btn-success">Suggest UserName</button>
    <div class="form-group">
      <label for="mail">Email</label>
      <input type="email" class="form-control" id="mail" placeholder="Email" name="email"
             ngModel required email #email="ngModel"
             [ngClass]="{'is-invalid':(email.invalid && email.touched),
                    'is-valid': (email.valid && email.touched)}">
      <div class="invalid-feedback">Please Enter a valid E-mail</div>
    </div>
  </div>
  <div *ngIf="userData.invalid && userData.touched" class="text-danger">Please provide valid user data</div>
``` 

The above code creating JSON object for username and email, and composite that under the key user-data. We can also
find the validity of the group by taking reference to variable and checking it's state. The composite object key name
is passed in ngModelGroup. For our above example the value object contains below type of JSON:
```json
  userData : {
       userName : "",
       email : ""
  }
```  

Now we will learn setting or patching values of form. First understand what is difference between these two. When we 
talk about setting the value it means we are setting every field value in the form. Patching means only set the value
which you want change in form. Ex.
  * **Setting the form value**
 ```angular2html
    <button type="button" class="btn btn-primary mr-2" (click)="populateDefaultValues()">Populate Default Values</button>
    <button type="button" class="btn btn-success" (click)="suggestUserName()">Suggest UserName</button>
 ```
 Above two buttons we are going to use to set and patch value. When we click to "Populate Default Values", then it is
 going to populate form using set method, but when we click the  "Suggest UserName", then it is going to change only
 userName to some suggested value.
 ```angular2
   populateDefaultValues() {
      this.signupForm.setValue(
        {
          userData: {
            userName: 'Mark',
            email: 'test@test.com',
            gender: 'male'
          },
          secretData: {
            secretQuestion: 'school',
            secretAnswer: 'Oxford'
          }
        });
    }
  ```
  So this will populate values, If we miss any control in JSON object while setting up the value, The method will 
  throw error which can be seen on console.
  
  * **Patching the form value**
  
  Below code will patch value of the form and suggest userName.
  ```angular2
    suggestUserName() {
        this.signupForm.form.patchValue(
          {
            userData: {userName: 'Anna'}
          });
      }
  ```
  So this will change the userName input value to Anna.
  
  * **Resetting the form**
  
  Now after submitting the form if you want to reset the form then you can use below code as well.
  ```angular2
   onSubmit() {
      console.log(this.signupForm);
      this.signupForm.reset();
    }
   ```
  
## Reactive Approach

## Summary

