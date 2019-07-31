import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ToastMessage} from '../../model/toast-message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastSubject = new Subject<ToastMessage>();

  constructor() {
  }

  publishMessage(toastMessage: ToastMessage) {
    this.toastSubject.next(toastMessage);
  }
}
