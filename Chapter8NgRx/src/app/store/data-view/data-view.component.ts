import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Store} from '@ngrx/store';
import {DeleteUserAction, StartEditUserAction} from '../state/user.actions';
import {AppState} from '../../common/application-store-manager';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  users: Observable<{ users: User[] }>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.users = this.store.select('userStore');
  }

  onEdit(editIndex: number) {
    this.store.dispatch(new StartEditUserAction({editIndex}));
  }

  deleteUser(deleteIndex: number) {
    this.store.dispatch(new DeleteUserAction(deleteIndex));
  }
}
