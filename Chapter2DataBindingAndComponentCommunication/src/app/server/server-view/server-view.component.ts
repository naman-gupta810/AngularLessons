import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ch-server-view',
  templateUrl: './server-view.component.html',
  styleUrls: ['./server-view.component.css']
})
export class ServerViewComponent implements OnInit {
  @Input() element: {
    name: string,
    type: string,
    content: string
  };
  constructor() { }

  ngOnInit() {
  }

}
