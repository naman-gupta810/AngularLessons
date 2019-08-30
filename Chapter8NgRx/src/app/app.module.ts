import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataInsertComponent} from './store/data-insert/data-insert.component';
import {HeaderComponent} from './common/header/header.component';
import {FormsModule} from '@angular/forms';
import {FakePostsComponent} from './effect/fake-posts/fake-posts.component';
import {StoreModule} from '@ngrx/store';
import {DataViewComponent} from './store/data-view/data-view.component';
import {applicationActionReducerMap} from './common/application-store-manager';
import {EffectsModule} from "@ngrx/effects";
import {PostEffects} from "./effect/state/post.effects";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    DataInsertComponent,
    HeaderComponent,
    FakePostsComponent,
    DataViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(applicationActionReducerMap),
    EffectsModule.forRoot([PostEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
