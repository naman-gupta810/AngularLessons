import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../model/recipe';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'rb-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  showSubMenu = false;
  constructor(private recipeService: RecipeService) {
  }
  ngOnInit(): void {
    this.recipeService.selectRecipe.subscribe((selectedRecipe: Recipe) => {
      this.recipe = selectedRecipe;
    });
  }


  addIngredientsToCart() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      this.showSubMenu = false;
  }
}
