import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsDemandeComponent } from './details-demande.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule, NgbPopoverModule, NgbTabsetModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MapModule } from '../../map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { AgreeDetailsModule } from '../../map-agree/agree-details/agree-details.module';



@NgModule({
  declarations: [
    DetailsDemandeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    NgbTabsetModule,
    StorageServiceModule,
    NgbCollapseModule,
    MapModule,
    HttpClientModule,
    AgreeDetailsModule
  ],
  exports: [
    DetailsDemandeComponent,
  ]
})
export class DetailsDemandeModule { }
