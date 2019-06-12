import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lrn-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  allowNewServer = false;
  anyServerCreated = 'Server not created';
  serverName = '';
  bindingServerName = 'Test Server';
  serverCreated = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
      this.bindingServerName = 'Changed Server';
    }, 2000);
  }

  ngOnInit() {
  }

  createNewServer() {
    this.anyServerCreated = 'Server Created with Name ' + this.serverName;
    this.serverCreated = true;
  }

  updateServerName(event: Event) {
    this.serverName = (event.target as HTMLInputElement).value;
  }
}
