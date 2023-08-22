import { Component, Injector, OnInit } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import * as moment from 'moment';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { CartPage } from 'src/app/pages/cart/cart.page';
import { AddRvPage } from 'src/app/pages/dashboard/add-rv/add-rv.page';
import { ChatBoxComponent } from 'src/app/pages/dashboard/chat/chat-box/chat-box.component';
import { ChatPage } from 'src/app/pages/dashboard/chat/chat.page';
import { Config } from './../../config/main.config';

@Component({
  selector: 'app-view-property-detail',
  templateUrl: './view-property-detail.component.html',
  styleUrls: ['./view-property-detail.component.scss'],
})
export class ViewPropertyDetailComponent extends BasePage implements OnInit {

  // res = {
  //   occupiedDates: [
  //     "2023-08-14T00:00:00.000000Z",
  //     "2023-08-15T00:00:00.000000Z",
  //     "2023-08-16T00:00:00.000000Z",
  //     "2023-08-17T00:00:00.000000Z",
  //     "2023-08-18T00:00:00.000000Z",
  //     "2023-08-19T00:00:00.000000Z",
  //     "2023-08-20T00:00:00.000000Z",
  //   ],
  //   dates: [
  //     "2023-08-01T00:00:00.000000Z",
  //     "2023-08-02T00:00:00.000000Z",
  //     "2023-08-03T00:00:00.000000Z",
  //     "2023-08-04T00:00:00.000000Z",
  //     "2023-08-05T00:00:00.000000Z",
  //     "2023-08-06T00:00:00.000000Z",
  //     "2023-08-07T00:00:00.000000Z",
  //     "2023-08-08T00:00:00.000000Z",
  //     "2023-08-09T00:00:00.000000Z",
  //     "2023-08-10T00:00:00.000000Z",
  //     "2023-08-11T00:00:00.000000Z",
  //     "2023-08-12T00:00:00.000000Z",
  //     "2023-08-13T00:00:00.000000Z",
  //     "2023-08-21T00:00:00.000000Z",
  //     "2023-08-22T00:00:00.000000Z",
  //     "2023-08-23T00:00:00.000000Z",
  //     "2023-08-24T00:00:00.000000Z",
  //     "2023-08-25T00:00:00.000000Z",
  //     "2023-08-26T00:00:00.000000Z",
  //     "2023-08-27T00:00:00.000000Z",
  //     "2023-08-28T00:00:00.000000Z",
  //     "2023-08-29T00:00:00.000000Z",
  //     "2023-08-30T00:00:00.000000Z",
  //     "2023-08-31T00:00:00.000000Z"
  //   ]
  // }
  // _daysConfig: DayConfig[] = [];
  // options: CalendarComponentOptions = {
  //   // from: new Date(), // Set the minimum selectable date to the current date
  //   pickMode: 'range',
  //   // showMonthPicker: false,
  //   // weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  //   // monthFormat: 'MMMM yyyy',
  //   daysConfig: [], // To customize specific days (optional)
  // };


  loading = true;
  price;
  url;
  park_images;
  park_spots;
  currentUser;
  // role_id: any;
  park;
  selectedPackageId: any[] = [];
  park_id;
  data: any;
  balls = [
    { name: '1A', color: 'white', bg_color: 'green', },
    { name: '1B', color: 'green', bg_color: '#F6F5F5', },
    { name: '1C', color: 'white', bg_color: '#F6F5F5', },
    { name: '1D', color: 'white', bg_color: 'green', },
    { name: '2A', color: 'green', bg_color: '#F6F5F5', },
    { name: '2B', color: 'white', bg_color: 'green', },
    { name: '2C', color: 'green', bg_color: '#F6F5F5', },
    { name: '2D', color: 'green', bg_color: '#F6F5F5', },
    { name: '3A', color: 'white', bg_color: 'green', },
    { name: '3B', color: 'white', bg_color: 'green', },
    { name: '3C', color: 'white', bg_color: 'green', },
    { name: '3D', color: 'green', bg_color: '#F6F5F5', },
    { name: '4A', color: 'green', bg_color: '#F6F5F5', },
    { name: '4B', color: 'white', bg_color: 'green', },
    { name: '4C', color: 'white', bg_color: 'green', },
    { name: '4D', color: 'white', bg_color: 'green', },
  ];
  selectedDate;
  item_id;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    // Customize specific days using daysConfig
    // this.customizeDays();

    this.url = Config.URL;

    const item_id = this.item_id;
    console.log('this is data', item_id);

    if (item_id) {
      let id = JSON.parse(item_id);
      this.park_id = id;

      const string: any = localStorage.getItem('user');
      let user = JSON.parse(string);
      this.currentUser = user;
      console.log('Current User : ', this.currentUser);

      if (!id) {
        this.modals.dismiss();
        return;
      }

      this.initialize(id);
    } else {
      this.modals.dismiss();
      return;
    }

  }


  async initialize(id) {
    const res = await this.network.getUserRoleId();
    // this.role_id = Number(res);
    console.log('role_id', res);

    this.loading = true;
    this.network.getSpotDetail({ id: id }).then(
      (res) => {
        console.log('getDetail', res);
        this.data = res;

        // this.price = 0;
        // if(this.data.park_sopts.length > 0){
        //   this.price = this.data.park_sopts[0]?.spot_price;
        // }

        // this.price = this.data.park_sopts[0]?.spot_price;
        this.loading = false;
        // console.log('this is park images', this.park_images);
        // this.park_spots = this.item.park_spots;
        // console.log('this is spots', this.park_spots);
        // this.url = Config.URL;
      },
      (err) => {
        this.modals.dismiss();
        return;
      }
    );
  }

  back() {
    this.modals.dismiss();
  }

  // menu();

  addToCart() {
    // this.nav.push('pages/cart');
    this.modals.present(CartPage);
  }

  async toggleDate() {
    console.log(this.data.park_sopts);
    var avsp: any[] = [];

    let avs = this.data.park_sopts.map((x) => {
      return x.available_date ? x.available_date : [];
    });

    avs.forEach((element) => {
      element.forEach((et: any) => {
        avsp.push(et);
      });
    });

    console.log(avsp);

    // const res = await this.modals.present(DatePickerComponent, 'transparent-modal');
    // console.log(res);
    // if(res && res.data){
    //   this.selectedDate = res.data.date[0];
    // }
    // console.log(this.selectedDate);
  }
  gotoAddRv(peram = null) {
    // set this item in local
    localStorage.setItem('park', JSON.stringify(this.data));
    this.nav.push('pages/dashboard/add-rv', { park_id: this.data.id });
  }

  async checkMyItemSelected(item, aitem) {
    let findIndex = this.selectedPackageId.findIndex((x) => x == aitem.id);
    if (findIndex != -1) {
      this.selectedPackageId = this.selectedPackageId.filter(
        (value) => value != aitem.id
      );
    } else {
      this.selectedPackageId.push(aitem.id);

      let obj = {
        // "park_id": this.data.id,
        // "spot_id": aitem.spot_id,
        // "available_date" : aitem.available_spot_date
        spot_available_date_id: aitem.id,
        package: '' + item.available_date[0].selected_package,
      };

      console.log(obj);

      const res = await this.network.addToCart(obj);
      console.log(res);
      this.utility.presentSuccessToast('Item added to cart');
    }
  }

  selectedCategory(item) {
    console.log(item);
  }

  isItemSelected(id) {
    let findIndex = this.selectedPackageId.findIndex((x) => x == id);
    return findIndex != -1;
  }

  async deletePark() {
    const res = await this.network.deletePark({
      park_id: this.park_id,
    });
    this.modals.dismiss();
  }

  async gotoBuySpot() {
    console.log('selectedPackageId', this.selectedPackageId);

    let spot: any = null;
    for (var i = 0; i < this.data.park_sopts.length; i++) {
      for (
        var j = 0;
        j < this.data.park_sopts[i]['available_date'].length;
        j++
      ) {
        console.log(
          this.data.park_sopts[i]['available_date'][j].id,
          this.selectedPackageId
        );
        if (
          this.data.park_sopts[i]['available_date'][j].id ==
          this.selectedPackageId
        ) {
          spot = this.data.park_sopts[i]['available_date'][j];
        }
      }
    }

    let obj = {
      park_id: this.data.id,
      spot_id: spot.spot_id,
      available_date: spot.available_spot_date,
    };

    console.log(obj);

    const res = await this.network.addToCart(obj);
    this.utility.presentSuccessToast('Item added to cart');
    this.modals.present(CartPage);
  }

  getItemImage(image) {
    if (image) {
      const res = this.url + image?.image_url;

      return res;
    } else {
      return 'assets/images/fl1.png';
    }
  }

  returnParseInt(v) {
    return parseInt(v, 10);
  }

  goToEditPark(peram = null) {
    console.log('this.data', this.data);

    this.modals.present(AddRvPage, {
      isEdit: true,
      park: this.data,
    });
  }
  gotoSelectSpot(item) {
    this.nav.push('pages/menu-details/select-spot', {
      item: JSON.stringify(item),
      // aitem: JSON.stringify(aitem)
    });
  }
  async changeSpot(param, item) {
    console.log(param.target.value);

    let data = {
      spot_id: item.id,
      availability: param.target.value,
    };
    this.network.changeSpotAvailablility(data).then((res) => {
      console.log(res);
    });
  }

  openChat() {
    if (this.currentUser.id == this.data.user_id) {
      // this.nav.push('pages/dashboard/chat',{park_id:this.park_id});
      this.modals.present(ChatPage, { park_id: this.park_id });
    } else {
      this.modals.present(ChatBoxComponent, {
        park_id: this.park_id,
        data: this.data,
      });
    }
  }

  writeParkAmenities(array) {
    return array.map((x) => x.amenity.name).join(', ');
  }

  writeParkCamper(item) {
    let it = item.length > 0 ? item[0] : null;
    return it.camper_size.name + ': ' + it.camper_size.type;
  }

  writeParkPeople(item) {
    return item.name + ': ' + item.capacity;
  }

  writeCamperName(a) {
    return a[0].camper_size.name;
  }
  writeCamperType(a) {
    return a[0].camper_size.type;
  }
  writeCamperDescription(a) {
    return a[0].camper_size.description;
  }

  writePeople(a) {
    console.log(a);
    return 'a';
  }

  writeCamperSize(b) { }

  writeCamperdescription(c) { }


  // startdate: any;
  // enddate: any;

  // getSetDates($event) {
  //   console.log($event);
  //   // const range = $event;

  //   // this.startdate = range.from.format('YYYY-MM-DD');
  //   // this.enddate = range.to.format('YYYY-MM-DD');
  //   // console.log('current date', this.enddate);


  // }

  // customizeDays() {

  //   for (let i = 0; i < this.res.dates.length; i++) {
  //     let newdate = moment(this.res.dates[i]).format('YYYY-MM-DD');
  //     console.log(newdate);
  //     this.options.daysConfig?.push({
  //       date: new Date(newdate),
  //       disable: false,
  //       // cssClass: 'mark-in-middle',
  //     })
  //   }

  //   for (let i = 0; i < this.res.occupiedDates.length; i++) {
  //     let newdate = moment(this.res.occupiedDates[i]).format('YYYY-MM-DD');
  //     console.log(newdate)
  //     this.options.daysConfig?.push({
  //       date: new Date(newdate),
  //       disable: true,
  //       cssClass: 'mark-in-middle',
  //     })
  //   }

  //   console.log('this.options => ', this.options)

  // this.options.daysConfig?.push(
  //   {
  //     date: new Date('2023-08-05'),
  //     subTitle: 'Custom Subtitle',
  //     cssClass: 'custom-day',
  //   },
  //   {
  //     date: new Date('2023-08-10'),
  //     disable: true,
  //     cssClass: 'mark-in-middle',
  //   },
  //   {
  //     date: new Date('2023-08-11'),
  //     disable: true,
  //     cssClass: 'mark-in-middle',
  //   },
  //   {
  //     date: new Date('2023-08-12'),
  //     disable: true,
  //     cssClass: 'mark-in-middle',
  //   },
  //   {
  //     date: new Date('2023-08-13'),
  //     disable: true,
  //     cssClass: 'mark-in-middle',
  //   },
  //   {
  //     date: new Date('2023-08-14'),
  //     disable: true,
  //     cssClass: 'mark-in-middle',
  //   },
  // )
  // console.log('this.options => ', this.options)

  // }


}
