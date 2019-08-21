import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataInsertComponent} from "./store/data-insert/data-insert.component";

const routes: Routes = [
  {path: 'state-management', component: DataInsertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
