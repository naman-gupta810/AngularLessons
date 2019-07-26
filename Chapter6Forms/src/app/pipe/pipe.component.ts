import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {

  appStatus = new Promise(((resolve, reject) => {
    setTimeout(() => {
      resolve('Online');
    }, 2000);
  }));

  users = [{
    id: 1,
    firstName: 'Max',
    lastName: 'Gayle',
    number: 5895666,
    lastLoggedIn: new Date(2019, 5, 22),
    status: 'active'
  }, {
    id: 3,
    firstName: 'Bill',
    lastName: 'Gates',
    number: 8826884,
    lastLoggedIn: new Date(2018, 9, 5),
    status: 'deleted'
  }, {
    id: 2,
    firstName: 'Anna',
    lastName: 'Royce',
    number: 158866,
    lastLoggedIn: new Date(2019, 8, 12),
    status: 'active'
  }, {
    id: 4,
    firstName: 'Steve',
    lastName: 'Walzniate',
    number: 155485,
    lastLoggedIn: new Date(2017, 1, 31),
    status: 'deleted'
  }];
  filterdString = '';


  constructor() {
  }

  ngOnInit() {
  }

}
