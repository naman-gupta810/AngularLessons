import {Injectable} from '@angular/core';
import {Recipe} from '../model/recipe';
import {Ingredient} from '../model/ingredient';
import {ShoppingCartService} from '../cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(1, 'Pasta', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/1/' +
      '07/0/JE401_Giadas-Pasta-with-Creamy-White-Beans_s4x3.jpg.rend.hgtvcom.826.620.suffix/1546886427856.jpeg',
      [new Ingredient('Penne Pasta', 500, 'gm'),
        new Ingredient('Peper', 2, 'gm'),
        new Ingredient('Tomato', 1, 'unit')]),
    new Recipe(2, 'Noodles', 'consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://kirbiecravings.com/wp-content/uploads/2018/02/garlic-noodles-61-700x680.jpg',
      [new Ingredient('Noodles', 250, 'gm'),
        new Ingredient('Tomato', 2, 'unit'),
        new Ingredient('Chilli sauce', 50, 'gm'),
        new Ingredient('Vinnegar', 2, 'ml')])

  ];

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  getRecipeById(id: number): Recipe {
    let selectedRecipe: Recipe = null;
    for (const recipe of this.recipes) {
      if (recipe.id === id) {
        selectedRecipe = recipe;
      }
    }
    return selectedRecipe;
  }

  getAllRecipes(): Recipe[] {
    return this.recipes.sort((a, b) => {
      return a.id - b.id;
    });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingCartService.addAllIngredients(ingredients);
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  replaceRecipe(editedRecipe: Recipe) {
    let selectedRecipe: Recipe = null;
    for (const recipe of this.recipes) {
      if (recipe.id === editedRecipe.id) {
        selectedRecipe = recipe;
      }
    }
    const index = this.recipes.indexOf(selectedRecipe);
    if (index > -1) {
      this.recipes.splice(index, 1);
    }
    this.recipes.unshift(editedRecipe);
  }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.indexOf(recipe);
    if (index > -1) {
      this.recipes.splice(index, 1);
    }

  }
}
