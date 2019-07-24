# Forms and Pipes
## Forms
Angular Forms library provide a way to connect your logic(.ts file) with your form inputs. Also we
need to validate input and change visualization depending on the validation and other properties.
Angular form library provide these thing to us. There are two way of building a form in Angular
  * Template Driven Approach - In this approach Angular infers the Form Object from DOM, we will
    work on DOM and attach that to TS file.
  * Reactive Approach - Form is created programmatically and template separately, once they are in place
    we will connect them manually, which gives us fined grained control on our forms.

In upcoming section we will see both the approaches and example.

We will start by designing same form in template. We are committing same as first commit for this chapter.

### Template Driven Approach
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
  
### Reactive Approach
To work with reactive forms we must include 'ReactiveFormsModule' in our app module. We already created a template
before starting the chapter. Now we will create our form in TS file and connect that to template. So for creating
basic structure of form first we need to define a formGroup in our TS file and then we initialize the form Controls
one by one. Once this is done, We need to tell angular don't scan and create form object by scanning our template.
So doing that we use the directive formGroup tag on the form. So It's look like below in TS and HTML file till now
```angular2
signUpForm: FormGroup;
ngOnInit() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null),
      email: new FormControl(null),
      secretQuestion: new FormControl('maidenName')
    });
  }
```
As provided in secretQuestion attribute the maidenName will be selected value. Now connect the form with our signForm
in the HTML, as well as controls. 
```angular2html
<h5>Reactive Form</h5>
<form [formGroup]="signUpForm" (submit)="onSubmit()">
  <div class="form-group">
    <label for="username">User Name</label>
    <input type="text" class="form-control" id="username" placeholder="UserName" formControlName="userName">
  </div>
  <button type="button" class="btn btn-success">Suggest UserName</button>
  <div class="form-group">
    <label for="mail">Email</label>
    <input type="email" class="form-control" id="mail" placeholder="Email" formControlName="email">
  </div>
  <div class="form-group">
    <label for="secretQuestion">Secret Question</label>
    <select class="form-control" id="secretQuestion" formControlName="secretQuestion">
      <option value="pet">Your First Name?</option>
      <option value="school">Your last School Name?</option>
      <option value="maidenName">Your mother maiden Name?</option>
    </select>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```
So in above form we have assigned formGroup which holds our singUpForm, then we will bind our controls using 
formControlName directive and pass the key from formGroup which we have kept in the TS file. Now control will
be associated with keys of formGroup.

Now let add the validation in form. To add the validation we will modify the formControls. We will pass the
Validators and method of it as second argument of the formControl. Ex.
```angular2
ngOnInit() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      secretQuestion: new FormControl('maidenName')
    });
  }
```

To validate the form we did below changes in template:
```angular2html
  <div class="form-group">
    <label for="username">User Name</label>
    <input type="text" class="form-control" id="username" placeholder="UserName" formControlName="userName"
           [ngClass]="{'is-invalid':(signUpForm.get('userName').invalid && signUpForm.get('userName').touched),
                    'is-valid': (signUpForm.get('userName').valid && signUpForm.get('userName').touched)}">
    <div class="invalid-feedback">Please Enter valid username</div>
  </div>
  <button type="button" class="btn btn-success">Suggest UserName</button>
  <div class="form-group">
    <label for="mail">Email</label>
    <input type="email" class="form-control" id="mail" placeholder="Email" formControlName="email"
           [ngClass]="{'is-invalid':(signUpForm.get('email').invalid && signUpForm.get('email').touched),
                    'is-valid': (signUpForm.get('email').valid && signUpForm.get('email').touched)}">
    <div class="invalid-feedback">Please Enter a valid E-mail</div>
  </div>
```

Now like we did in Template driven approach we will group the data in JSON array to build composite object. To
do this in reactive approach we need to do below changes.
```angular2
 ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        userName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      secretQuestion: new FormControl('maidenName')
    });
  }
```

To accommodate the changes we need to add **\<div formGroupName="userData"\>** to the control we want to group,
And since we added them in formGroup, we need to get them using formGroupName.formControlName. Like Below:
```angular2
<div formGroupName="userData">
    <div class="form-group">
      <label for="username">User Name</label>
      <input type="text" class="form-control" id="username" placeholder="UserName" formControlName="userName"
             [ngClass]="{'is-invalid':(signUpForm.get('userData.userName').invalid && signUpForm.get('userData.userName').touched),
                    'is-valid': (signUpForm.get('userData.userName').valid && signUpForm.get('userData.userName').touched)}">
      <div class="invalid-feedback">Please Enter valid username</div>
    </div>
    <button type="button" class="btn btn-success">Suggest UserName</button>
    <div class="form-group">
      <label for="mail">Email</label>
      <input type="email" class="form-control" id="mail" placeholder="Email" formControlName="email"
             [ngClass]="{'is-invalid':(signUpForm.get('userData.email').invalid && signUpForm.get('userData.email').touched),
                    'is-valid': (signUpForm.get('userData.email').valid && signUpForm.get('userData.email').touched)}">
      <div class="invalid-feedback">Please Enter a valid E-mail</div>
    </div>
  </div>
``` 

Like we had mentioned with reactive forms we have fine grained control over the template driven control. Now we will 
add dynamic field in our form. We are adding hobbies field in our form which can be zero or more. We need to do below 
changes in form:


We need to add FormArray in userData field, and then when we click on the add hobby then we will create control and push
the control in array. Then we will iterate over the array and create the control.
```angular2
ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        userName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        hobbies: new FormArray([])
      }),
      secretQuestion: new FormControl('maidenName')
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('userData.hobbies') as FormArray).push(control);
  }
```

```angular2html
<div formArrayName="hobbies">
      <label>Hobbies</label><br/>
      <button type="button" class="btn btn-primary" (click)="onAddHobby()">Add New Hobby</button>
      <div class="form-group" *ngFor="let hobbyControl of signUpForm.get('userData.hobbies').controls; let i=index">
        <input type="text" class="form-control" [formControlName]="i"
               [ngClass]="{'is-invalid':(hobbyControl.invalid && hobbyControl.touched),
                    'is-valid': (hobbyControl.valid && hobbyControl.touched)}">
      </div>
    </div>
```
As we can see we passed the formArrayName and then we get the controls and iterate the array, and iterated through
array and given the controlName on the array index.

Now with Reactive forms we can provide custom validators too in the method argument. Like for this example we don't
want userName to be Mark or Anna, so we can define the rule in the TS file and then provide that to in the array.
We need to define validator by below code it should return key value pair if the field is invalid and if valid
then we need to return null only.
```angular2
fodbiddedUserNames(formControl: FormControl): { [s: string]: boolean } {
    if (formControl.value === 'Mark' || formControl.value === 'Anna') {
      return {forbiddenUserName: true};
    }
    return null;
  }
```

Now we will add this validator to our username formControl like below:
```angular2
  userName: new FormControl(null, [Validators.required, this.fodbiddedUserNames.bind(this)]),
```

On the custom validation we are returning key which can be used to show custom message by checking key like below:
```angular2html
<div class="invalid-feedback" *ngIf="signUpForm.get('userData.userName').errors['required']">This field is required</div>
      <div class="invalid-feedback" *ngIf="signUpForm.get('userData.userName').errors['forbiddenUserName']">
        This user is already registered
      </div>
```
So when required if failed first message will be shown and when our custom validation will be failed then the,second 
message will be shown.

Sometimes we validate some fields value using the DB entries in sever. So in that case we can't use validators. We need
to create Async validators which go to server and then provide that the field has valid value or not. For this example 
we will create async validator for E-mail field and then we are going to use that. For demonstration purpose we will
delay the validation using JS API like it is coming for server. The Async validator returns promise or observables, that
will resolve to key value pair or null like in custom validators.

```angular2
fodbiddenEmail(formControl: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formControl.value === 'test@test.com') {
          resolve({forbiddedEmail: true});
        }
        resolve(null);
      }, 2000);
    });
  }
```

To add this to form control we will use below code:
```angular2
 ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        userName: new FormControl(null, [Validators.required, this.forbiddenUserNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], [this.fodbiddenEmail.bind(this)]),
        hobbies: new FormArray([])
      }),
      secretQuestion: new FormControl('maidenName')
    });
  }
```

Setting and patching value using TS file. 
```angular2
populateDefaultValues() {
    this.signUpForm.setValue({
      userData: {
        userName: 'Default User',
        email: 'test@gmail.com',
        hobbies: [{1: 'PlayStation'}, {2: 'Tracking'}]
      },
      secretQuestion: 'school'
    });
  }

  suggestUserName() {
    this.signUpForm.patchValue({
      userData: {userName: 'SuperUser'}
    });
  }
```

And reset of Form after submission.
```angular2
onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({});
  }
```



