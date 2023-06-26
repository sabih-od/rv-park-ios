import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesComponent } from './amenities.component';
import { IonicModule } from '@ionic/angular';
import { AddAmenitiesModule } from '../add-amenities/add-amenities.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AmenitiesComponent],
  imports: [CommonModule, IonicModule, AddAmenitiesModule, FormsModule],
  exports: [AmenitiesComponent],
})
export class AmenitiesModule {}
