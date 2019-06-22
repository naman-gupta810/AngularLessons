import {Component, OnInit} from '@angular/core';
import {AccountDataService} from './account-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  accounts: {name: string, status: string}[] = [];

  constructor(private accountDataService: AccountDataService) {}

  ngOnInit(): void {
    this.accounts = this.accountDataService.accounts;
  }
}
