import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../model/recipe';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastService} from '../../common/toast/toast.service';
import {ToastMessage} from '../../model/toast-message';

@Component({
  selector: 'rb-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private toastService: ToastService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*    this.recipeService.selectRecipe.subscribe((selectedRecipe: Recipe) => {
          this.recipe = selectedRecipe;
        });*/
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipeById(+params.id);
    });
  }


  addIngredientsToCart() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.toastService.publishMessage(new ToastMessage('Ingredients Added',
      this.recipe.ingredients.length + ' Ingredients added in shopping cart', 'lightgreen'));
  }
}
