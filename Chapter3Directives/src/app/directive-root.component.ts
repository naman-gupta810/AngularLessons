import { Component } from '@angular/core';

@Component({
  selector: 'ch-root',
  templateUrl: './directive-root.component.html',
  styleUrls: ['./directive-root.component.css']
})
export class DirectiveRootComponent {
  numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
}
