import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../model/recipe';

@Component({
  selector: 'rb-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor() {
  }

  ngOnInit() {
  }
}
