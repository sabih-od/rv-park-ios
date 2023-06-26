import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCamperComponent } from './add-camper.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddCamperComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [AddCamperComponent],
})
export class AddCamperModule {}
