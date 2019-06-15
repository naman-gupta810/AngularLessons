import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../model/ingredient';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Turmeric', 20, 'gm'),
    new Ingredient('Coriander', 10, 'gm'),
    new Ingredient('Flour', 1, 'kg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
