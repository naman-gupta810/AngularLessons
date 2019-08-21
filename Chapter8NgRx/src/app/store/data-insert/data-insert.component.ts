import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataStoreService} from "../data-store.service";

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.component.html',
  styleUrls: ['./data-insert.component.css']
})
export class DataInsertComponent implements OnInit {

  @ViewChild('emailForm', {static: true}) form: NgForm;
  emails: string[];

  constructor(private ds: DataStoreService) {
  }

  ngOnInit() {
    this.emails = this.ds.getAllEmails();
  }

  addEmail() {
    this.ds.addEmail(this.form.value.email);
  }
}
