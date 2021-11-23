import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ConsulterUsersRoutingModule } from './consulter-users-routing.module';
import { ConsulterUsersComponent } from './consulter-users.component';
import { HttpClientModule } from '@angular/common/http'
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { DetailsDemandeModule } from '../consulter-demandes/details-demande/details-demande.module';
import { MapModule } from 'src/app/demo/dashboard/map/map.module';
import {AgreeDetailsModule} from 'src/app/demo/dashboard/map-agree/agree-details/agree-details.module'
import{MapAgreeModule} from 'src/app/demo/dashboard/map-agree/mapAgree.module'
@NgModule({
  imports: [
    CommonModule,
    ConsulterUsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    NgbTabsetModule,
    StorageServiceModule,
    NgbCollapseModule,
    NgbAccordionModule,
    HttpClientModule,
    AngularFireFunctionsModule,
    MapModule,
    DetailsDemandeModule,
    

    AgreeDetailsModule,
    MapAgreeModule
  ],
  declarations: [
    ConsulterUsersComponent,
  ],
  providers:[
    
  ],
})
export class ConsulterUsersModule { }
