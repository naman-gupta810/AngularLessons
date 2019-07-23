import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TemplateDrivenFormComponent} from './template-driven/template-driven-form/template-driven-form.component';
import {ReactiveFormComponent} from './reactive/reactive-form/reactive-form.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const applicationRoutes: Routes = [
  {path: 'template-driven', component: TemplateDrivenFormComponent},
  {path: 'reactive', component: ReactiveFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent
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
