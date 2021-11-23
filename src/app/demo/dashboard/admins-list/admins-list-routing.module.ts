import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminListComponent} from './admins-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsListRoutingModule { }
