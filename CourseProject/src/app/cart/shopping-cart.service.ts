import {Injectable} from '@angular/core';
import {Ingredient} from '../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private ingredients: Ingredient[] = [
    new Ingredient('Turmeric', 20, 'gm'),
    new Ingredient('Coriander', 10, 'gm'),
    new Ingredient('Flour', 1, 'kg')
  ];

  constructor() {
  }

  public getAllShoppingItems(): Ingredient[] {
    return this.ingredients;
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

  public addAllIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  public clearCart() {
    while (this.ingredients.length) {
      this.ingredients.pop();
    }
  }

  deleteIngredient(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
  }

}
