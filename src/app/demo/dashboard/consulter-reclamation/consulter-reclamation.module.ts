import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsulterReclamationsRoutingModule } from './consulter-reclamations-routing.module';
//import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { ConsulterReclamationComponent } from './consulter-reclamation.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule, NgbPopoverModule, NgbTooltipModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { RolesModule } from '../roles/roles.module';
import { HttpClientModule } from '@angular/common/http';
import { MapModule } from 'src/app/demo/dashboard/map/map.module';
import { DetailReclamationComponent } from './detail-reclamation/detail-reclamation.component';

@NgModule({
  declarations: [
   ConsulterReclamationComponent,
   DetailReclamationComponent,
  
   ],
  imports: [
    CommonModule,
    ConsulterReclamationsRoutingModule,
    CommonModule,
    //AdminsListRoutingModule,
    SharedModule,
    NgbPopoverModule,
    NgbTabsetModule,
     FormsModule,
     ReactiveFormsModule,
    NgbProgressbarModule,
     NgbPopoverModule,
     NgbTooltipModule,
    MapModule,
    
    RolesModule,
    HttpClientModule
    
  ], exports: [ConsulterReclamationComponent]
 
})
export class ConsulterReclamationModule { }
