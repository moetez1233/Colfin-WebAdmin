import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewAdminRoutingModule } from './add-new-admin-routing.module';
import { AddNewAdminComponent } from './add-new-admin.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { RolesModule } from '../roles/roles.module';

@NgModule({
  imports: [
    CommonModule,
    AddNewAdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    NgbTabsetModule,
    HttpClientModule,
    StorageServiceModule,
    HttpClientModule,    
    RolesModule,
  ],
  declarations: [
    AddNewAdminComponent,
  ],
  providers : [
    HttpClient
  ]
})
export class AddNewAdminModule { }
