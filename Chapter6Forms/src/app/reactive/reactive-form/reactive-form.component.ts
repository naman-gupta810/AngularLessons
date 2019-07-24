import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {promise} from 'selenium-webdriver';
import {interval, Observable, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  signUpForm: FormGroup;

  constructor() {
  }

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

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({});
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('userData.hobbies') as FormArray).push(control);
  }

  forbiddenUserNames(formControl: FormControl): { [s: string]: boolean } {
    if (formControl.value === 'Mark' || formControl.value === 'Anna') {
      return {forbiddenUserName: true};
    }
    return null;
  }

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

  populateDefaultValues() {
    this.signUpForm.setValue({
      userData: {
        userName: 'Mark',
        email: 'test@gmail.com',
        hobbies: []
      },
      secretQuestion: 'school'
    });
  }

  suggestUserName() {
    this.signUpForm.patchValue({
      userData: {userName: 'SuperUser'}
    });
  }
}
