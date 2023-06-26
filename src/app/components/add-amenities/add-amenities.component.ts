import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-add-amenities',
  templateUrl: './add-amenities.component.html',
  styleUrls: ['./add-amenities.component.scss'],
})
export class AddAmenitiesComponent extends BasePage implements OnInit {
  name: any;
  user_id: any;
  currentUser: any;
  aForm!: FormGroup;
  description: any;
  @Input() title: any;
  @Input() item: any;
  @Input() park_id: any;
  @Input() tag: any;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  back() {
    this.modals.dismiss();
  }

  async submit() {
    if (this.item) {
      let data = {
        id: this.item.id,
        name: this.item.name,
        description: String(this.item.description),
        park_id: this.park_id,
      };
      console.log(data);

      await this.network.editAmenities(data);
      this.utility.presentSuccessToast('Amenity updated successfully');
      this.modals.dismiss({ data: data });
    } else {
      let data = {
        name: this.name,
        description: String(this.description),
        park_id: this.park_id,
      };
      console.log(data);

      await this.network.addAmenities(data);
      this.utility.presentSuccessToast('Amenity added successfully');
      this.modals.dismiss({ data: data });
    }
  }
}
