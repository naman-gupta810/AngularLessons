import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AddUserAction, StopEditUserAction, UpdateUserAction} from '../state/user.actions';
import {AppState} from '../../common/application-store-manager';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.component.html',
  styleUrls: ['./data-insert.component.css']
})
export class DataInsertComponent implements OnInit, OnDestroy {

  @ViewChild('emailForm', {static: true}) form: NgForm;
  isEditMode = false;
  subscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('userStore').subscribe(stateData => {
      if (stateData.editUserIndex > -1) {
        this.isEditMode = true;
        this.form.setValue(stateData.editUser);
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.store.dispatch(new UpdateUserAction({user: this.form.value}));
    } else {
      this.store.dispatch(new AddUserAction(this.form.value));
    }
    this.isEditMode = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new StopEditUserAction());
  }
}
