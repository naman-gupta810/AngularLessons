import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error-description',
  templateUrl: './error-description.component.html',
  styleUrls: ['./error-description.component.css']
})
export class ErrorDescriptionComponent implements OnInit {

  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }

}
