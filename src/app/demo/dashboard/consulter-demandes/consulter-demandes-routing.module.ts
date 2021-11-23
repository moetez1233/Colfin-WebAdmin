import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsulterDemandesComponent } from './consulter-demandes.component';

const routes: Routes = [
  {
    
    path: '',
    component: ConsulterDemandesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulterDemandesRoutingModule { }
