import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CalendarModule } from 'ion2-calendar';
import { ViewPropertyDetailComponent } from './view-property-detail.component';

@NgModule({
  declarations: [ViewPropertyDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule
  ]
})
export class ViewPropertyDetailModule { }
