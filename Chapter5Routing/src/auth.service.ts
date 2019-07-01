import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

  private isLoggedIn = false;

  public isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 800);
    });
  }

  public login(): void {
    this.isLoggedIn = true;
  }

  public logOff(): void {
    this.isLoggedIn = false;
  }

}
