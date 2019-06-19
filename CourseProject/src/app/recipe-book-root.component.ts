import {Component} from '@angular/core';

@Component({
  selector: 'rb-root',
  templateUrl: './recipe-book-root.component.html',
  styleUrls: ['./recipe-book-root.component.css']
})
export class RecipeBookRootComponent {
  selectedMenuItem = 'recipe';

  changeMenu(menuName: string) {
    this.selectedMenuItem = menuName;
  }
}
