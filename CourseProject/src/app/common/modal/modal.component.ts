import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'rb-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  close = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onClose() {
    this.close.next();
  }
}
