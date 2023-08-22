import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { AddAmenitiesComponent } from '../add-amenities/add-amenities.component';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
})
export class AmenitiesComponent extends BasePage implements OnInit {
  name: any;
  description: any;
  amenities: any;
  loading = true;
  @Input() park_id;
  @Input() item;
  @Input() tag;
  @Input() amenitie = [];
  // item: any;
  checkItem: any[] = [];
  constructor(injector: Injector) {
    super(injector);
    this.getAmenitities();
  }

  ngOnInit() { }

  back() {
    this.modals.dismiss();
  }
  async openAdd(addTitle) {
    const res = await this.modals.present(AddAmenitiesComponent, {
      tag: 'add',
      title: addTitle,
      park_id: this.park_id,
    });
    this.name = res.data.data.name;
    this.description = res.data.data.description;
    console.log(res);
    this.getAmenitities();
  }
  async editAmenities(editTitle, item) {
    const res = await this.modals.present(AddAmenitiesComponent, {
      tag: 'edit',
      title: editTitle,
      item: item,
      park_id: this.park_id,
    });
    this.getAmenitities();
  }
  async getAmenitities() {
    const res = await this.network.getAmenities();
    this.loading = false;
    
    console.log('amenitie', this.amenitie, res);
    // this.amenities = res
    if (this.amenitie.length > 0) {
      this.amenities = res.map((item) => {
        let findIndex = this.amenitie.find((x: any) => x.id == item.id);
        if (findIndex) {
          item['checked'] = true;
        }
        return item;
      });
    }else{
      this.amenities = res;
    }
  }
  async deleteAmenities(id) {
    await this.network.deleteAmenities({ id: id });
    this.utility.presentSuccessToast('Amenity delete successfully');
    this.getAmenitities();
  }

  async submit() {
    // let data = {
    //   name: this.checkItem,
    // };
    // console.log(data);

    const data = this.amenities.filter((x) => x.checked == true);
    console.log(data);

    await this.modals.dismiss({ data: data });
  }
  changeAmenities(value) {
    this.checkItem.push(value);
  }
}
