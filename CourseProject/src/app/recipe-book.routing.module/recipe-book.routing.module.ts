import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeViewContainerComponent} from '../recipe/recipe-view-container/recipe-view-container.component';
import {ShoppingListComponent} from '../cart/shopping-list/shopping-list.component';
import {RecipeDetailsComponent} from '../recipe/recipe-details/recipe-details.component';
import {RecipeEditComponent} from '../recipe/recipe-edit/recipe-edit.component';
import {LoginComponent} from '../common/auth/login/login.component';


const routes: Routes = [{path: '', component: RecipeViewContainerComponent},
  {
    path: 'recipes', component: RecipeViewContainerComponent,
    children: [
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailsComponent},
      {path: 'edit/:id', component: RecipeEditComponent}]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RecipeBookRoutingModule {

}
