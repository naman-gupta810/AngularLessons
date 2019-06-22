import { Component, EventEmitter, Output } from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountDataService} from '../account-data.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountDataService: AccountDataService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountDataService.addAccount({
      name: accountName,
      status: accountStatus
    });
    this.loggingService.logAccountStatusChanges(accountStatus);
  }
}
