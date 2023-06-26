import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AmountPeopleComponent } from './amount-people.component';
import { IconInputBoxModule } from '../icon-input-box/icon-input-box.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AmountPeopleComponent],
  imports: [CommonModule, IonicModule, IconInputBoxModule, FormsModule],
  exports: [AmountPeopleComponent],
})
export class AmountPeopleModule { }
