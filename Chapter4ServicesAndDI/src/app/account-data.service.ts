import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AccountDataService {

  constructor() { }

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  addAccount(newAccount: {name: string, status: string}) {
    this.accounts.push(newAccount);
  }

  changeStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
  }


}
