import {Injectable} from '@angular/core';
import {User} from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [];
  loggedInUsers: { [key: string]: User } = {};

  constructor() {
  }

  signUp(email: string, password: string) {
    let isUserAlreadyRegistered = false;
    for (const user of this.users) {
      if (user.email === email) {
        isUserAlreadyRegistered = true;
        break;
      }
    }
    if (!isUserAlreadyRegistered) {
      this.users.push(new User(email, password));
      return true;
    } else {
      return false;
    }
  }

  login(email: string, password: string) {
    for (const user of this.users) {
      if (user.email === email) {
        if (user.password === password) {
          user.token = this.buildToken();
          return user;
        }
      }
    }
    return null;
  }

  buildToken() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  }
}
