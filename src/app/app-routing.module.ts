import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'user/add/:id',
    component: UserEditComponent
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
