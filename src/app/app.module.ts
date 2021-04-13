import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ContentsListComponent } from './contents-list/contents-list.component';
import { TopFiveComponent } from './top-five/top-five.component';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ContentsDetailComponent } from './contents-detail/contents-detail.component';
import { ContentsPostingComponent } from './contents-posting/contents-posting.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentsListComponent,
    TopFiveComponent,
    JoinComponent,
    LoginComponent,
    ContentsDetailComponent,
    ContentsPostingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
