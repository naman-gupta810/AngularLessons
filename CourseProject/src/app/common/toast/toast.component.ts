import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from './toast.service';
import {interval, Subscription} from 'rxjs';
import {ToastMessage} from '../../model/toast-message';

@Component({
  selector: 'rb-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toastSubscription: Subscription;
  toasts: ToastMessage[] = [];
  interVal;

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    this.toastSubscription = this.toastService.toastSubject.subscribe((value => {
      this.toasts.push(value);
    }));
    this.interVal = setInterval(() => {
      this.toasts.shift();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
    clearInterval(this.interVal);
  }

}
