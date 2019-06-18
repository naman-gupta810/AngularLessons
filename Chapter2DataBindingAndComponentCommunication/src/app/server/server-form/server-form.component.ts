import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ch-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {
  @Output() serverAdded = new EventEmitter<{name: string, content: string}>();
  @Output() blueprintAdded = new EventEmitter<{name: string, content: string}>()
  newServerName = '';
  newServerContent = '';
  constructor() { }

  ngOnInit() {
  }

  onAddServer() {
    this.serverAdded.emit({
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.blueprintAdded.emit({
      name: this.newServerName,
      content: this.newServerContent
    });
  }

}
