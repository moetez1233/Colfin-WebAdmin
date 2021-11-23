import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreeDetailsComponent } from './agree-details.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule, NgbPopoverModule, NgbTabsetModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'angular-webstorage-service';



@NgModule({
  declarations: [AgreeDetailsComponent],
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
    NgbAccordionModule,
  ],
  exports: [
    AgreeDetailsComponent
  ]
})
export class AgreeDetailsModule { }
