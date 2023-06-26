import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-add-camper',
  templateUrl: './add-camper.component.html',
  styleUrls: ['./add-camper.component.scss'],
})
export class AddCamperComponent extends BasePage implements OnInit {
  name: any= "";
  user_id: any;
  currentUser: any;
  aForm!: FormGroup;
  description: any= "";
  @Input() title: any;
  @Input() item: any;
  @Input() park_id: any ="";
  @Input() tag: any;
  type: any ="";

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    if(this.item !== undefined){
     this.name = this.item.name
     this.type =this.item.type
     this.description =this.item.description
    }
  }
  back() {
    this.modals.dismiss();
  }

  async submit() {
    if (this.item !== undefined) {
      let data = {
        name: this.name,
        id: this.item.id,
        type: this.type,
        description: String(this.item.description),
        park_id: this.park_id,
      };
      console.log(data);

      await this.network.editCamperSize(data);
      this.utility.presentSuccessToast('Camper Size updated successfully');
      this.modals.dismiss({ data: data });
    } else {
      let data = {
        name: this.name,
        type:this.type,
        description: String(this.description),
        park_id: this.park_id,
      };
      console.log(data);

      await this.network.addCamperSize(data);
      this.utility.presentSuccessToast('Camper Size added successfully');
      this.modals.dismiss({ data: data });
    }
  }
}
