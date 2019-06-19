import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../model/recipe';

@Component({
  selector: 'rb-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() recipeToDisplay: EventEmitter<Recipe> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  selectRecipe(recipe: Recipe) {
      this.recipeToDisplay.emit(recipe);
  }
}
