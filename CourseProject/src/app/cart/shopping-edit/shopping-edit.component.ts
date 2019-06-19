import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../model/ingredient';

@Component({
  selector: 'rb-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  ingredient: Ingredient = new Ingredient('Test', 0.1, 'ml');
  @Output() ingredientAdd: EventEmitter<Ingredient> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  onIngredientAdd() {
    console.log(this.ingredient);
    this.ingredientAdd.emit(this.ingredient);
  }
}
