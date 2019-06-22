import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../model/ingredient';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'rb-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  ingredient: Ingredient;
  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.ingredient = new Ingredient('', 0, null);
  }

  onIngredientAdd() {
    this.shoppingCartService.addIngredient(this.ingredient);
    this.ingredient = new Ingredient('', 0, null);
  }
}
