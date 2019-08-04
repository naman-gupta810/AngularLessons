import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService{
  errorMessages = [];

  constructor() {
    this.errorMessages['name'] = {
      required: 'Name field is required',
      minlength: 'Name field should be of atleast 3 Characters'
    };
    this.errorMessages['amount'] = {
      required: 'Amount field is required',
      min: 'Amount should be greater than 0'
    };
    this.errorMessages['imagePath'] = {
      required: 'Image is required'
    };
    this.errorMessages['description'] = {
      required: 'Recipe description is required',
      minlength: 'Description should be of minimum 20 characters'
    };
  }

  getErrorMessage(fieldName: string, error: string) {
    return this.errorMessages[fieldName][error];
  }

}
