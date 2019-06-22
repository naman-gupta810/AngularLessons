import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountDataService} from '../account-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accountDataService: AccountDataService) {
  }

  onSetTo(status: string) {
    this.accountDataService.changeStatus(this.id, status);
    this.loggingService.logAccountStatusChanges(status);
  }
}
