import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MapAgreeRoutingModule } from './mapAgree-routing.module';
import { MapAgreeComponent } from './mapAgree.component';
import { MapModule } from '../map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AgreeDetailsModule } from './agree-details/agree-details.module';




@NgModule({
  imports: [
    CommonModule,
    MapAgreeRoutingModule,
    MapModule,
    CommonModule,
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
    AgreeDetailsModule,
  ],
  declarations: [
    MapAgreeComponent,
  ],
  providers: [

  ],
})
export class MapAgreeModule { }
