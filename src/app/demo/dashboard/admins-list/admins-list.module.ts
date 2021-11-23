import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './admins-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule, NgbPopoverModule, NgbTooltipModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminsListRoutingModule } from './admins-list-routing.module'
import { RolesModule } from '../roles/roles.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    AdminsListRoutingModule,
    SharedModule,
    NgbPopoverModule,
    NgbTabsetModule,
    // FormsModule,
    // ReactiveFormsModule,
    // NgbProgressbarModule,
    // NgbPopoverModule,
    // NgbTooltipModule
    RolesModule,
    HttpClientModule
  ],
  declarations: [
    AdminListComponent,
  ]
})
export class AdminsListModule { }
