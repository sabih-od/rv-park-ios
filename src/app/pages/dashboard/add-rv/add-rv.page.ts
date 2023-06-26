import { BasePage } from 'src/app/pages/base-page/base-page';
import { FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import { AddSpotComponent } from './add-spot/add-spot.component';
import { Config } from 'src/app/config/main.config';
import { SclistComponent } from 'src/app/components/sclist/sclist.component';
import { CclistComponent } from 'src/app/components/cclist/cclist.component';
import { AmenitiesComponent } from 'src/app/components/amenities/amenities.component';
import { AmountPeopleComponent } from 'src/app/components/amount-people/amount-people.component';
import { CamperSizeComponent } from 'src/app/components/camper-size/camper-size.component';

@Component({
  selector: 'app-add-rv',
  templateUrl: './add-rv.page.html',
  styleUrls: ['./add-rv.page.scss'],
})
export class AddRvPage extends BasePage implements OnInit {
  aForm!: FormGroup;
  image: any;
  amenities: any;
  park_id: any;
  @Input() park;
  @Input() isEdit = true;
  spots = [];
  selectedState: any;
  url;
  urls = [
    {
      id: 1,
      image_url: null,
    },
    {
      id: 2,
      image_url: null,
    },
    {
      id: 3,
      image_url: null,
    },
    {
      id: 4,
      image_url: null,
    },
    {
      id: 5,
      image_url: null,
    },
    {
      id: 6,
      image_url: null,
    },
  ];
  paths: any[] = [];
  spotName: any;
  step = 1;
  loading = false;
  spotlist = [];
  upload_image = false;
  campersize: any = '';
  amountofpeople: any;
  amountofpeopleString = '';
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.url = Config.URL;
    this.setupForm();
    // this.addSpot()
  }

  inputChange($event, type) {
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }
  getData($event) {
    console.log('aya?', $event);
    this.spotName = $event.data.location;
    console.log('spotName', this.spotName);
  }
  hide() {
    this.spotName = !this.spotName;
  }
  setupForm() {
    this.aForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      province: ['', Validators.compose([Validators.required])],
      country: ['USA', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
    console.log('this is value', this.aForm.value);
    console.log('this.park', this.park);

    if (this.park) {
      if (this.isEdit === true) {
        this.inputChange(this.park.name, 'name');
        this.inputChange(this.park.address, 'address');
        this.inputChange(this.park.city, 'city');
        this.inputChange(this.park.location, 'location');
        this.inputChange(this.park.province, 'province');
        this.inputChange(this.park.country, 'country');
        this.inputChange(this.park.description, 'description');
        this.inputChange(this.park.id, 'id');
        this.park_id = this.park.id;

        this.getParkAmenities();
        this.getCamperSize();
        this.getPeopleList();
      }
    }
  }

  async addRv() {
    if (
      this.aForm.controls['name'].value === '' ||
      this.aForm.controls['name'].value === ' ' ||
      this.aForm.controls['name'].value === undefined ||
      this.aForm.controls['address'].value === '' ||
      this.aForm.controls['address'].value === ' ' ||
      this.aForm.controls['address'].value === undefined ||
      this.aForm.controls['location'].value === '' ||
      this.aForm.controls['location'].value === ' ' ||
      this.aForm.controls['location'].value === undefined ||
      this.aForm.controls['city'].value === '' ||
      this.aForm.controls['city'].value === ' ' ||
      this.aForm.controls['city'].value === undefined ||
      this.aForm.controls['province'].value === '' ||
      this.aForm.controls['province'].value === ' ' ||
      this.aForm.controls['province'].value === undefined ||
      this.aForm.controls['country'].value === '' ||
      this.aForm.controls['country'].value === ' ' ||
      this.aForm.controls['country'].value === undefined ||
      this.aForm.controls['description'].value === '' ||
      this.aForm.controls['description'].value === ' ' ||
      this.aForm.controls['description'].value === undefined
    ) {
      this.alert.showAlert('Enter Details');
    } else {
      if (!this.park_id) {
        this.loading = true;
        const res = await this.network.addPark(this.aForm.value);
        this.utility.presentSuccessToast('Parks Added');
        console.log('getPark', res);
        this.park = res;
        this.park_id = res.id;
      } else {
        this.loading = true;
        const res = await this.network.editPark(this.aForm.value);
        this.utility.presentSuccessToast('Parks Updated');
        console.log('getPark', res);
        this.park_id = res.id;
        this.getSpotList();
      }
      this.step = 2;
      this.loading = false;
    }
  }

  async addParkAmenities() {
    let data = {
      park_id: this.park_id,
      amenities: this.amenities.map((x) => x.id),
    };
    this.network.addParkAmenities(data);
  }

  async addParkCamperSize() {
    console.log(this.campersize);
    let data = {
      park_id: this.park_id,
      camper_size: [this.campersize.id],
    };
    this.network.addParkCamperSize(data);
  }

  async addParkPeople() {
    for (var i = 0; i < this.amountofpeople.length; i++) {
      let data = {
        park_id: this.park_id,
        name: this.amountofpeople[i].name,
        capacity: this.amountofpeople[i].count
          ? this.amountofpeople[i].count.toString()
          : '',
      };
      this.network.addPeopleType(data);
    }
  }

  async submitstep() {
    this.loading = true;
    this.addParkAmenities();
    this.addParkCamperSize();
    this.addParkPeople();

    this.loading = false;

    this.step = 3;
    this.loading = false;
  }

  async addSpot() {
    const res = await this.modals.present(AddSpotComponent, {
      park_id: this.park_id,
    });

    if (res) {
      this.getSpotList();
    }
  }

  async getSpotList() {
    const res = await this.network.postAvailableSpot({
      park_id: this.park_id,
    });

    if (res) {
      this.spotlist = res;
    }
  }

  async addSpotImage() {
    const res = await this.modals.present(AddSpotComponent, {
      park_id: this.park_id,
    });
    this.getSpotList();
  }

  async goToEditPark(item) {
    console.log('editSPot', item);

    const res = await this.modals.present(AddSpotComponent, {
      park_id: this.park_id,
      item: item,
      edit: true,
    });
    this.getSpotList();
  }

  addImages() {
    this.step = 4;
    if (this.park) {
      if (this.isEdit === true) {
        for (let index = 0; index < this.park.park_images.length; index++) {
          let findIndex = this.urls.findIndex((x) => x.image_url == null);
          const element = this.park.park_images[index];
          if (findIndex != -1) {
            this.urls[findIndex].image_url = element.image_url;
          }
        }
      }
    }
  }

  async uploadImage() {
    // let element: HTMLElement = document.getElementById(
    //   'file-input'
    // ) as HTMLElement;
    // element.click();
    let result: any = await this.imageService.openCamera();
    console.log('result', result);
    console.log('urls:', this.urls);

    let findIndex = this.urls.findIndex((x) => x.image_url == null);
    console.log('index:', findIndex);

    if (result) {
      let data = {
        park_id: findIndex + 1,
        park_images: [result],
      };
      console.log('data:', data);
      if (findIndex != -1) {
        this.network.uploadImage(data).then(
          (res) => {
            this.urls[findIndex].image_url = res.image_url;
          }
          // this.urls.push({
          //   id: findIndex+1,
          //   image_url: res.image_url,
          // });
        );
      }
    }
  }

  onSelectFile(event) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]); // read file as data url
    //   reader.onload = (event: any) => {
    //     // called once readAsDataURL is completed
    //     let findIndex = this.urls.findIndex((x) => x.image_url == null);
    //     if (findIndex != -1) {
    //       this.urls[findIndex].image_url = event.target.result;
    //     }
    //     if (event.target.result) {
    //       let data = {
    //         park_id: this.park_id,
    //         park_images: [event.target.result],
    //       };
    //       this.network.uploadImage(data).then((res) => {
    //         let index = this.urls.length;
    //         this.urls.push({
    //           id: index,
    //           image_url: res.image_url,
    //         });
    //       });
    //     }
    //   };
    // }
  }

  finishProcess() {
    this.modals.dismiss();
    this.events.publish('reload-dashboard');
    this.nav.push('pages/dashboard');
  }

  async deleteImage(items) {
    this.urls = this.urls.filter((item) => item.id !== items.id);
    const res = await this.network.deleteImage({ image_id: items.id });
  }

  async deleteSpot(items) {
    const res = await this.network.deleteSpot({ spot_id: items.id });
    this.getSpotList();
  }

  getItemImage(image) {
    if (image) {
      const res = this.url + image?.image_url;
      return res;
    } else {
      return 'assets/images/fl1.png';
    }
  }

  async openAmountPeople() {
    const res = await this.modals.present(AmountPeopleComponent, {
      tag: 'Amount',
      amountofpeople: this.amountofpeople,
    });
    console.log('amountPeople', res);
    if (res.data?.data) {
      this.amountofpeople = res.data.data;
    }

    // this.amountofpeopleString =
    //   'Adults:' +
    //   res.data.data.Adults +
    //   ',Childrens:' +
    //   res.data.data.Childrens +
    //   ',Pets:' +
    //   res.data.data.Pets +
    //   '';
  }

  async openAmenities() {
    const res = await this.modals.present(AmenitiesComponent, {
      tag: 'Amenities',
      park_id: this.park_id,
      amenitie: this.amenities,
    });
    console.log('AmenitiesComponent', res);
    if (res.data?.data) {
      this.amenities = res.data.data;
    }
  }

  // async openEditCamperSize() {
  //   const res = await this.modals.present(CamperSizeComponent, {
  //     EditCamperSize: true,
  //     park_id: this.park_id,
  //     camperSizeEditDetail: this.campersize,
  //   });
  //   console.log('CamperSizeComponent', res);
  //   if (res.data?.data) {
  //     this.campersize = res.data.data;
  //   }
  // }
  async openCamperSize() {
    const res = await this.modals.present(CamperSizeComponent, {
      tag: 'CamperSize',
      EditCamperSize: true,
      park_id: this.park_id,
      camperSizeEditDetail: this.campersize,
    });
    console.log('CamperSizeComponent', res);
    if (res.data?.data) {
      this.campersize = res.data.data;
    }
    // } else {
    //   this.openEditCamperSize();
    // }
  }

  async openStates() {
    const res = await this.modals.present(SclistComponent, {
      tag: 'States',
    });
    console.log('asd', res.data.data);
    if (res.data && res.data.data) {
      this.selectedState = res.data.data;
      this.aForm.controls['province'].setValue(res.data.data.name);
    }
  }
  async openCities() {
    if (this.aForm.controls['province'].invalid) {
      return;
    }

    let v = this.aForm.controls['province'].value;

    const res = await this.modals.present(CclistComponent, {
      state: this.selectedState,
    });

    console.log('asd', res.data.data);
    if (res.data && res.data.data) {
      this.aForm.controls['city'].setValue(res.data.data.name);
    }
  }
  removeAmenities(index) {
    console.log('adsasd');

    this.amenities.splice(index, 1);
  }
  back() {
    this.modals.dismiss();
  }
  async getPeopleList() {
    const res = await this.network.getPeopleList(this.park_id);
    console.log('getPeopleList', res);

    if (res) {
      this.amountofpeople = res;
    }
  }

  async getParkAmenities() {
    const res = await this.network.getParkAmenities(this.park_id);

    let newArray = res.map((item) => {
      return item.amenity;
    });

    console.log('getParkAmenities', newArray);
    // [{
    //   amenity: {id: 1, name: 'Wi-Fi', description: 'Lorem Ipsum is simply dummy text of the printing a…tting industry. Lorem Ipsum has been the industry', user_id: null, created_at: '2023-05-05T13:55:33.000000Z',
    //   amenity_id: 1,
    //   created_at: null,
    //   id: 77,
    //   park_id: 161,
    // updated_at: null}]
    if (res) {
      this.amenities = newArray;
    }
  }

  async getCamperSize() {
    const res = await this.network.getCamperSizes(this.park_id);
    console.log('getCamperSize', res);

    let newArray = res.map((item) => {
      return item.camper_size;
    });

    console.log('camper_size', newArray);
    if (res) {
      this.campersize = newArray[0];
    }
  }
}
