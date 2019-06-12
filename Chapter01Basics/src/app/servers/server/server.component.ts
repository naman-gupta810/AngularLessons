import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lrn-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  ID: number = 10;
  status: string = 'Online';


  constructor() {
  }

  ngOnInit() {
  }

  getServerStatus() {
    return status;
  }
}
