import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../model/recipe';
import {Ingredient} from '../model/ingredient';
import {ShoppingCartService} from '../cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Pasta', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/1/' +
      '07/0/JE401_Giadas-Pasta-with-Creamy-White-Beans_s4x3.jpg.rend.hgtvcom.826.620.suffix/1546886427856.jpeg',
      [new Ingredient('Penne Pasta', 500, 'gm'),
        new Ingredient('Peper', 2, 'gm'),
        new Ingredient('Tomato', 1, 'unit')]),
    new Recipe('Noodles', 'consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://kirbiecravings.com/wp-content/uploads/2018/02/garlic-noodles-61-700x680.jpg',
      [new Ingredient('Noodles', 250, 'gm'),
        new Ingredient('Tomato', 2, 'unit'),
        new Ingredient('Chilli sauce', 50, 'gm'),
        new Ingredient('Vinnegar', 2, 'ml')])

  ];

  selectRecipe: EventEmitter<Recipe> = new EventEmitter();

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingCartService.addAllIngredients(ingredients);
  }
}
