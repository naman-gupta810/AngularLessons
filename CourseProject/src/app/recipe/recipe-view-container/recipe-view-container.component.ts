import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../model/recipe';

@Component({
  selector: 'rb-recipe-view-container',
  templateUrl: './recipe-view-container.component.html',
  styleUrls: ['./recipe-view-container.component.css']
})
export class RecipeViewContainerComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor() {
  }

  ngOnInit() {
  }
}
