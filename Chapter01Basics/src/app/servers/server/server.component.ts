import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lrn-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  ID = 10;
  status = 'Online';


  constructor() {
    this.status = Math.random() > 0.5 ? 'Online' : 'Offline';
  }

  ngOnInit() {
  }

  getServerStatus() {
    return this.status;
  }

  getColor() {
    return this.status === 'Online' ? 'green' : 'red';
  }
}
