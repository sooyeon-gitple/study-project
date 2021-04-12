import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContentsComponent} from './contents/contents.component';
import {JoinComponent} from './join/join.component';
import {LoginComponent} from './login/login.component';
import {TopFiveComponent} from './top-five/top-five.component';


const routes:Routes = [
  { path: 'join', component: JoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contents', component: ContentsComponent },
  { path: 'top-five', component: TopFiveComponent },
];

@NgModule({
  // declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
