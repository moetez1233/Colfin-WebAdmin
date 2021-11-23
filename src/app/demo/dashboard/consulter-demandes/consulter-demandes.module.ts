import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ConsulterDemandesRoutingModule } from './consulter-demandes-routing.module';
import { ConsulterDemandesComponent } from './consulter-demandes.component';
import { MapModule } from '../map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailsDemandeModule } from './details-demande/details-demande.module';


@NgModule({
  imports: [
    CommonModule,
    ConsulterDemandesRoutingModule,
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
    DetailsDemandeModule
  ],
  declarations: [
    ConsulterDemandesComponent,
  ],
  providers:[
    
  ],
})
export class ConsulterDemandesModule { }
