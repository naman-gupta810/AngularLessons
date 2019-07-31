import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeViewContainerComponent} from '../recipe/recipe-view-container/recipe-view-container.component';
import {ShoppingListComponent} from '../cart/shopping-list/shopping-list.component';
import {RecipeDetailsComponent} from '../recipe/recipe-details/recipe-details.component';


const routes: Routes = [{path: '', component: RecipeViewContainerComponent},
  {
    path: 'recipes', component: RecipeViewContainerComponent,
    children: [{path: ':id', component: RecipeDetailsComponent}]
  },
  {path: 'shopping-list', component: ShoppingListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RecipeBookRoutingModule {

}
