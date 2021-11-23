import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsulterUsersComponent } from './consulter-users.component';

const routes: Routes = [
  {
    path: '',
    component: ConsulterUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulterUsersRoutingModule { }
