import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAmenitiesComponent } from './add-amenities.component';
import { IonicModule } from '@ionic/angular';
import { IconInputBoxModule } from '../icon-input-box/icon-input-box.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddAmenitiesComponent],
  imports: [
    CommonModule,
    IonicModule,
    IconInputBoxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddAmenitiesComponent],
})
export class AddAmenitiesModule {}
