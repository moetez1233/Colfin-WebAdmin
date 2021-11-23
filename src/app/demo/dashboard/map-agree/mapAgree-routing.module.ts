import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapAgreeComponent } from './mapAgree.component';

const routes: Routes = [
  {
    path: '',
    component: MapAgreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapAgreeRoutingModule { }
