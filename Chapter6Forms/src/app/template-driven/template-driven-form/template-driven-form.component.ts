import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {

  @ViewChild('f', {static: true}) signupForm: NgForm;
  defaultQuestion = 'school';
  secretAnswer = '';
  genders = ['male', 'female', 'others'];

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

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

  suggestUserName() {
    this.signupForm.form.patchValue(
      {
        userData: {userName: 'Anna'}
      });
  }
}
