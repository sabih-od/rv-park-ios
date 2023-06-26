import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { AddCamperComponent } from '../add-camper/add-camper.component';

@Component({
  selector: 'app-camper-size',
  templateUrl: './camper-size.component.html',
  styleUrls: ['./camper-size.component.scss'],
})
export class CamperSizeComponent extends BasePage implements OnInit {
  name: any;
  type: any;
  // amenities: any;
  camperSize: any;
  @Input() park_id;
  @Input() camperSizeEditDetail;
  @Input() EditCamperSize;
  item: any;
  radio: any;

  constructor(injector: Injector) {
    super(injector);
    this.getCamperSize();
  }
  ngOnInit() {}

  back() {
    this.modals.dismiss();
  }
  async openAdd(addTitle) {
    const res = await this.modals.present(AddCamperComponent, {
      tag: 'add',
      title: addTitle,
      park_id: this.park_id,
    });
    this.name = res.data.data.name;
    this.type = res.data.data.type;
    console.log('add AddCamperComponent', res);
    this.getCamperSize();
  }
  async editCamperSize(editTitle, item) {
    const res = await this.modals.present(AddCamperComponent, {
      tag: 'edit',
      title: editTitle,
      item: item,
      park_id: this.park_id,
    });
    console.log('edit AddCamperComponent', res);
    this.getCamperSize();
  }
  async getCamperSize() {
    const res = await this.network.getCamperSize();
    console.log('res', res);
    this.camperSize = res;

    if (this.camperSizeEditDetail) {
      console.log('camperSizeEditDetail', this.camperSizeEditDetail);

      // set radio value
      this.radio = this.camperSizeEditDetail.id;
    }
  }
  async deleteCamperSize(id) {
    await this.network.deleteCamperSize({ id: id });
    this.utility.presentSuccessToast('Camper Size delete successfully');
    this.getCamperSize();
  }

  async submit() {
    // let data = {
    //   name: this.checkItem,
    // };
    console.log(this.radio);
    let v = this.camperSize.find((x) => x.id == this.radio);
    await this.modals.dismiss({ data: v });
  }
  changeCamperSize(value) {
    this.radio.push(value);
  }
}
