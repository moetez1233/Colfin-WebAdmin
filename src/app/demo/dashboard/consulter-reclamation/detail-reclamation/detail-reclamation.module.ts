import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{DetailReclamationComponent} from './detail-reclamation.component'
import { MapModule } from 'src/app/demo/dashboard/map/map.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapModule
  ],
  exports:[
    DetailReclamationComponent,
  ]
})
export class DetailReclamationModule { }
