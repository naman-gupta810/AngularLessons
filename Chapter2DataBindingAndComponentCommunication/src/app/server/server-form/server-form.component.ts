import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'ch-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {
  @Output() serverAdded = new EventEmitter<{name: string, content: string}>();
  @Output() blueprintAdded = new EventEmitter<{name: string, content: string}>()
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverAdded.emit({
      name: serverNameInput.value,
      content: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintAdded.emit({
      name:  serverNameInput.value,
      content: this.serverContentInput.nativeElement.value
    });
  }

}
