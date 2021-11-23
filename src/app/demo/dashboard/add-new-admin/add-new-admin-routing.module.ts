import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddNewAdminComponent} from './add-new-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AddNewAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewAdminRoutingModule { }
