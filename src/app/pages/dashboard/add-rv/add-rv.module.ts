import { SwiperModule } from 'swiper/angular';
import { BaseHeaderModule } from 'src/app/components/base-header/base-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRvPageRoutingModule } from './add-rv-routing.module';

import { AddRvPage } from './add-rv.page';
import { HomeSwitcherModule } from '../components/home-switcher/home-switcher.module';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { MultipleSpotModule } from './multiple-spot/multiple-spot.module';
import { AddSpotModule } from './add-spot/add-spot.module';
import { AmenitiesModule } from 'src/app/components/amenities/amenities.module';
import { AmountPeopleModule } from 'src/app/components/amount-people/amount-people.module';
import { CamperSizeModule } from 'src/app/components/camper-size/camper-size.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddRvPageRoutingModule,
    HomeSwitcherModule,
    BaseHeaderModule,
    IconInputBoxModule,
    MultipleSpotModule,
    AddSpotModule,
    SwiperModule,
    AmenitiesModule,
    AmountPeopleModule,
    CamperSizeModule,
  ],
  declarations: [AddRvPage],
})
export class AddRvPageModule {}
