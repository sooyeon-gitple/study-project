import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContentsListComponent} from './contents-list/contents-list.component';
import {JoinComponent} from './join/join.component';
import {LoginComponent} from './login/login.component';
import {TopFiveComponent} from './top-five/top-five.component';
import {ContentsDetailComponent} from './contents-detail/contents-detail.component';
import {ContentsPostingComponent} from './contents-posting/contents-posting.component';

const routes:Routes = [
  { path: 'join', component: JoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contents-list', component: ContentsListComponent },
  { path: 'top-five', component: TopFiveComponent },
  { path: 'content/:id', component: ContentsDetailComponent},
  { path: 'post', component: ContentsPostingComponent},
  { path: 'edit/:id', component: ContentsPostingComponent}
];

@NgModule({
  // declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
