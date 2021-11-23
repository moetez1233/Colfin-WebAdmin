import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTraceabilityComponent } from './dashboard-traceability.component';
import { DashboardTraceabilityAnalyticsRoutingModule } from './dashboard-traceability-routing.module';
import { MapModule } from 'src/app/demo/dashboard/map/map.module';
import{ConsulterReclamationModule} from'src/app/demo/dashboard/consulter-reclamation/consulter-reclamation.module'
import { RolesModule } from '../roles/roles.module';


@NgModule({
  declarations: [DashboardTraceabilityComponent],
  imports: [
    CommonModule,
    DashboardTraceabilityAnalyticsRoutingModule,
    MapModule ,
    ConsulterReclamationModule,
    RolesModule
  ], exports: [DashboardTraceabilityComponent]
})
export class DashboardTraceabilityModule { }
