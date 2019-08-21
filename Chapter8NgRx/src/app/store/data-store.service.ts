import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  emails: string[] = ['test@test.com'];

  constructor() {
  }

  addEmail(email: string) {
    this.emails.push(email);
  }

  getAllEmails() {
    return this.emails.slice(0, this.emails.length);
  }
}
