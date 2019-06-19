import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked: EventEmitter<string> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  onSelect(menuItem: string) {
    this.menuClicked.emit(menuItem);
  }
}
