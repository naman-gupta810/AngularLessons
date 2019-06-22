import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../model/recipe';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'rb-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
  }

  selectRecipe(recipe: Recipe) {
      this.recipeService.selectRecipe.emit(recipe);
  }
}
