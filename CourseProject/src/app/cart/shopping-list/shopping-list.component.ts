import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../model/ingredient';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingCartService.getAllShoppingItems();
  }

  deleteIngredient(ingredient: Ingredient) {
    this.shoppingCartService.deleteIngredient(ingredient);
  }
}
