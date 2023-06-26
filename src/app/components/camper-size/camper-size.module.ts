import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamperSizeComponent } from './camper-size.component';
import { IonicModule } from '@ionic/angular';
import { IconInputBoxModule } from '../icon-input-box/icon-input-box.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCamperModule } from '../add-camper/add-camper.module';



@NgModule({
  declarations: [CamperSizeComponent],
  imports: [
    CommonModule,
    IonicModule,
    IconInputBoxModule,
    FormsModule,
    ReactiveFormsModule,
    AddCamperModule
  ],
  exports: [CamperSizeComponent],
})
export class CamperSizeModule { }
