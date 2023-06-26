import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-amount-people',
  templateUrl: './amount-people.component.html',
  styleUrls: ['./amount-people.component.scss'],
})
export class AmountPeopleComponent extends BasePage implements OnInit {
  name: any;
  description: any;
  amenities: any;
  Adults: any;
  Childrens: any;
  Pets: any;
  @Input() park_id;
  @Input() amountofpeople;
  item: any;
  checkItem: any[] = [];
  peopletype: any;
  constructor(injector: Injector) {
    super(injector);
    this.getPeopleType();
  }

  ngOnInit() {}

  back() {
    this.modals.dismiss();
  }
  // async openAdd(addTitle) {
  //   const res = await this.modals.present(AddAmenitiesComponent, {
  //     tag: 'add',
  //     title: addTitle,
  //     park_id: this.park_id,
  //   });
  //   this.name = res.data.data.name;
  //   this.description = res.data.data.description;
  //   console.log(res);
  //   this.getPeopleType();
  // }
  // async editAmenities(editTitle, item) {
  //   const res = await this.modals.present(AddAmenitiesComponent, {
  //     tag: 'edit',
  //     title: editTitle,
  //     item: item,
  //     park_id: this.park_id,
  //   });
  //   this.getPeopleType();
  // }
  async getPeopleType() {
    const res = await this.network.getPeopleList(this.park_id);
    console.log('res', res);
    this.peopletype = res;
    if (this.amountofpeople) {
      console.log('amountofpeople', this.amountofpeople);
      this.Adults = this.amountofpeople[0]?.count;
      this.Childrens = this.amountofpeople[1]?.count;
      this.Pets = this.amountofpeople[2]?.count;
    }
  }
  async deletePeopleType(id) {
    await this.network.deletePeopleType({ id: id });
    this.utility.presentSuccessToast('TYPE delete successfully');
    this.getPeopleType();
  }

  async submit() {
    let data = [
      { park_id: this.park_id, name: 'Adults', count: this.Adults },
      {
        park_id: this.park_id,
        name: 'Childrens',
        count: this.Childrens,
      },
      {
        park_id: this.park_id,
        name: 'Pets',
        count: this.Pets,
      },
    ];
    console.log(data);

    await this.modals.dismiss({ data: data });
  }
  changeAmenities(value) {
    this.checkItem.push(value);
  }
}
