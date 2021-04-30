import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppComponent } from './app.component';
import { ContentsListComponent } from './contents-list/contents-list.component';
import { TopFiveComponent } from './top-five/top-five.component';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ContentsDetailComponent } from './contents-detail/contents-detail.component';
import { ContentsPostingComponent } from './contents-posting/contents-posting.component';
import { GlobalState } from '../service/global-state.service';
import { MainComponent } from './main/main.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ContentsListComponent,
    TopFiveComponent,
    JoinComponent,
    LoginComponent,
    ContentsDetailComponent,
    ContentsPostingComponent,
    MainComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    ReactiveFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ko',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [GlobalState],
  bootstrap: [AppComponent],
})
export class AppModule {}
