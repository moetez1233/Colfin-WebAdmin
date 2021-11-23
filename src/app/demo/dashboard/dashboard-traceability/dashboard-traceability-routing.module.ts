import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardTraceabilityComponent } from './dashboard-traceability.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardTraceabilityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardTraceabilityAnalyticsRoutingModule { }
