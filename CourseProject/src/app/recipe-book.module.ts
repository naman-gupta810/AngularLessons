import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RecipeBookRootComponent} from './recipe-book-root.component';
import {RecipeListComponent} from './recipe/recipe-list/recipe-list.component';
import {RecipeDetailsComponent} from './recipe/recipe-details/recipe-details.component';
import {ShoppingListComponent} from './cart/shopping-list/shopping-list.component';
import {HeaderComponent} from './common/header/header.component';
import {ShoppingEditComponent} from './cart/shopping-edit/shopping-edit.component';
import {RecipeListItemComponent} from './recipe/recipe-list/recipe-list-item/recipe-list-item.component';
import {RecipeViewContainerComponent} from './recipe/recipe-view-container/recipe-view-container.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeBookRoutingModule} from './recipe-book.routing.module/recipe-book.routing.module';
import { ShortenPipe } from './common/shorten.pipe';
import { OpenDropDownMenuDirective } from './common/open-drop-down-menu.directive';
import { ToastComponent } from './common/toast/toast.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { LoginComponent } from './common/auth/login/login.component';
import { ModalComponent } from './common/modal/modal.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    RecipeBookRootComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    ShoppingListComponent,
    HeaderComponent,
    ShoppingEditComponent,
    RecipeListItemComponent,
    RecipeViewContainerComponent,
    ShortenPipe,
    OpenDropDownMenuDirective,
    ToastComponent,
    RecipeEditComponent,
    LoginComponent,
    ModalComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecipeBookRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [RecipeBookRootComponent],
  entryComponents: [ModalComponent]
})
export class RecipeBookModule {
}
