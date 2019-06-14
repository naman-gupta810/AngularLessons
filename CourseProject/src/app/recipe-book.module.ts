import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RecipeBookRootComponent} from './recipe-book-root.component';
import {RecipeListComponent} from './recipe/recipe-list/recipe-list.component';
import {RecipeDetailsComponent} from './recipe/recipe-details/recipe-details.component';
import {ShoppingListComponent} from './cart/shopping-list/shopping-list.component';
import {HeaderComponent} from './common/header/header.component';
import {ShoppingEditComponent} from './cart/shopping-edit/shopping-edit.component';
import {RecipeItemComponent} from './recipe/recipe-list/recipe-item/recipe-item.component';
import {RecipeViewContainerComponent} from './recipe/recipe-view-container/recipe-view-container.component';

@NgModule({
  declarations: [
    RecipeBookRootComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    ShoppingListComponent,
    HeaderComponent,
    ShoppingEditComponent,
    RecipeItemComponent,
    RecipeViewContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [RecipeBookRootComponent]
})
export class RecipeBookModule {
}
