import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//import { ConsulterReclamationComponent } from './consulter-reclamation/consulter-reclamation.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgbPopoverModule,
    NgbTooltipModule,    
  ],
  //declarations: [ConsulterReclamationComponent],
  

})
export class DashboardModule { }
