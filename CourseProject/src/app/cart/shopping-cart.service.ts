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
}
