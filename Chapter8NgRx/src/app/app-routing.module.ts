import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataInsertComponent} from './store/data-insert/data-insert.component';
import {FakePostsComponent} from './effect/fake-posts/fake-posts.component';

const routes: Routes = [
  {path: 'state-management', component: DataInsertComponent},
  {path: 'effects', component: FakePostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
