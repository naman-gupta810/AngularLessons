import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TemplateDrivenFormComponent} from './template-driven/template-driven-form/template-driven-form.component';
import {ReactiveFormComponent} from './reactive/reactive-form/reactive-form.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeComponent} from './pipe/pipe.component';
import { ShortenPipe } from './pipe/shorten.pipe';
import { FilterPipe } from './pipe/filter.pipe';


const applicationRoutes: Routes = [
  {path: 'template-driven', component: TemplateDrivenFormComponent},
  {path: 'reactive', component: ReactiveFormComponent},
  {path: 'pipes', component: PipeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    PipeComponent,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(applicationRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
