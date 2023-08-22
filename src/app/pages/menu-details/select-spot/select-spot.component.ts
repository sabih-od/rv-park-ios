import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import * as moment from 'moment';
import { DayConfig, CalendarComponentOptions } from 'ion2-calendar';
@Component({
  selector: 'app-select-spot',
  templateUrl: './select-spot.component.html',
  styleUrls: ['./select-spot.component.scss'],
})
export class SelectSpotComponent
  extends BasePage
  implements OnInit, AfterViewInit {
  item;
  aitem;
  dailyDate;
  weeklyDate;
  dailyPackage;
  weeklyPackage;
  monthlyPackage;
  getAllAvailableDates: any[] = [];
  occupiedDates: any[] = [];
  selectedDate;
  monthlyDate;
  enddate: any;
  finalEndDate: any;
  startdate: any;
  selectedPackageId: any[] = [];

  item_startdate;
  item_enddate;


  packageType = 'Daily';
  packagePrice = 0;

  ctype = 'daily';
  expression = false;
  dateRange;
  _daysConfig: DayConfig[] = [];
  type = 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    // disableWeeks: [0, 1, 6],
    daysConfig: [],
    // to: new Date('2023-03-31'),
    // from: new Date('2023-03-01')
  };

  loadcalender = false;

  constructor(injector: Injector) {
    super(injector);
    const params = this.nav.getQueryParams();
    this.item = JSON.parse(params['item']);
    // this.item.start_date = '2023-08-01';
    // this.item.end_date = '2023-08-31';
    console.log('params => ', this.item)
    // this.aitem = JSON.parse(params['aitem']);
    console.log('asdik', this.item);
    this.item_startdate = moment(this.item.start_date).format('MM/DD/YYYY');
    this.item_enddate = moment(this.item.end_date).format('MM/DD/YYYY');

    console.log('asdik', this.aitem);
    this.initialize();
  }

  ngAfterViewInit(): void { }

  ngOnInit() { }

  ionViewWIllEnter() {
    // this.initialize();
  }

  back() {
    this.nav.pop();
  }

  async initialize() {
    let data = {
      spot_id: this.item.id,
    };

    const res = await this.network.getSpotDates(data);
    this.loadcalender = true;
    // const res = {
    //   "occupiedDates": [
    //     "2023-08-09T00:00:00.000000Z",
    //     "2023-08-10T00:00:00.000000Z",
    //     "2023-08-11T00:00:00.000000Z",
    //     "2023-08-12T00:00:00.000000Z",
    //     "2023-08-22T00:00:00.000000Z",
    //     "2023-08-23T00:00:00.000000Z",
    //     "2023-08-24T00:00:00.000000Z"
    //   ],
    //   "dates": [
    //     "2023-08-08T00:00:00.000000Z",
    //     "2023-08-09T00:00:00.000000Z",
    //     "2023-08-10T00:00:00.000000Z",
    //     "2023-08-11T00:00:00.000000Z",
    //     "2023-08-12T00:00:00.000000Z",
    //     "2023-08-13T00:00:00.000000Z",
    //     "2023-08-14T00:00:00.000000Z",
    //     "2023-08-15T00:00:00.000000Z",
    //     "2023-08-16T00:00:00.000000Z",
    //     "2023-08-17T00:00:00.000000Z",
    //     "2023-08-18T00:00:00.000000Z",
    //     "2023-08-19T00:00:00.000000Z",
    //     "2023-08-20T00:00:00.000000Z",
    //     "2023-08-21T00:00:00.000000Z",
    //     "2023-08-22T00:00:00.000000Z",
    //     "2023-08-23T00:00:00.000000Z",
    //     "2023-08-24T00:00:00.000000Z",
    //     "2023-08-25T00:00:00.000000Z",
    //     "2023-08-26T00:00:00.000000Z",
    //     "2023-08-27T00:00:00.000000Z",
    //     "2023-08-28T00:00:00.000000Z"
    //   ]
    // }

    // res.dates = res.dates.filter(date => !res.occupiedDates.includes(date));

    console.log(res);
    if (res) {
      if(typeof res.occupiedDates === 'object'){
        res.occupiedDates = Array.from(res.occupiedDates);
      }
      this.occupiedDates = res.occupiedDates;
      console.log('this.occupiedDates => ', this.occupiedDates)
    }
    if (res.dates.length <= 0) {
      return;
    }

    // this.dateRange = { from: moment(res.dates[0]).format(), to: moment(res.dates[res.dates.length - 1]) };

    let from = moment(res.dates[0]).format('MM/DD/YYYY');
    let to = moment(res.dates[res.dates.length - 1]).format('MM/DD/YYYY');

    console.log(to, from);
    // this.optionsRange['from'] = new Date(from);
    // this.optionsRange['to'] = new Date(to);
    console.log('this.occupiedDates.length => ', this.occupiedDates.length);


    for (let i = 0; i < this.occupiedDates.length; i++) {
      let d = moment(this.occupiedDates[i]).format('YYYY-MM-DD');
      console.log('this.d => ', d)
      this.optionsRange.daysConfig?.push({
        date: new Date(d),
        disable: true,
        cssClass: 'mark-in-middle',
      });
    }

    console.log('this.optionsRange.daysConfig => ', this.optionsRange.daysConfig);

    for (let i = 0; i < res.dates.length; i++) {
      let d = moment(res.dates[i]).format('YYYY-MM-DD');
      this.optionsRange.daysConfig?.push({
        date: new Date(d),
        // disable: false,
        // cssClass: 'mark-in-middle',
      });
    }


    // this.optionsRange['daysConfig'] = this._daysConfig;
    this.expression = true;

    // for( var i = 0; i < this.occupiedDates.length; i++){

    //   this._daysConfig.
    // }

    // _daysConfig

    for (let index = 0; index < res.dates.length; index++) {
      const element = res.dates[index];
      let d = element.split('', 10).join('');
      this.getAllAvailableDates.push(d);
    }
  }

  checkIfDateBooked(item) {
    let flag = false;

    for (var i = 0; i < this.occupiedDates.length; i++) {
      flag = moment(this.occupiedDates[i]).isSame(item, 'day');

      if (flag) {
        break;
      }
    }

    return !flag ? 'primary' : 'danger';
  }

  // validation check
  isDatesLieInOccupiedDates() {
    if (!this.startdate) {
      return true;
    }

    if (!this.enddate) {
      return true;
    }

    // if from start date and end date has

    let flag = false;
    for (var i = 0; i < this.occupiedDates.length; i++) {
      let r = moment(this.occupiedDates[i]);
      flag = r.isBetween(this.startdate, this.enddate, 'days', '[]');

      if (flag == true) {
        break;
      }
    }

    return false;
  }

  ctyleChange($event) {
    console.log($event);
    let v = $event.target.value;
    console.log(v);
    this.expression = false;
    switch (this.ctype) {
      case 'daily':
        this.optionsRange.pickMode = 'range';
        break;
      case 'weekly':
        this.optionsRange.pickMode = 'range';
        break;
      case 'monthly':
        this.optionsRange.pickMode = 'range';
        break;
    }
    setTimeout(() => {
      this.expression = true;
    }, 1000);
  }

  async checkMyItemSelected() {
    console.log('as', this.startdate);

    if (this.isDatesLieInOccupiedDates()) {
      this.utility.presentFailureToast('Please reselect dates');
      return;
    }

    let findIndex = this.selectedPackageId.findIndex((x) => x == this.item.id);
    if (findIndex != -1) {
      this.selectedPackageId = this.selectedPackageId.filter(
        (value) => value != this.item.id
      );
    } else {
      this.selectedPackageId.push(this.item.id);

      let obj = {
        package_type: 'Daily',
        start_date: moment(this.startdate).format('YYYY-MM-DD'),
        end_date: moment(this.enddate).format('YYYY-MM-DD'),
        spot_id: this.item.id,
      };

      console.log(obj);

      const res = await this.network.addToCart(obj);
      console.log(res);
      this.utility.presentSuccessToast('Item added to cart');
      this.nav.pop();
    }
  }

  dateChange($event) {
    console.log($event.target.value);

    this.selectedDate = moment($event.target.value);
    if (this.packageType == 'Daily') {
      // let daily = moment(this.selectedDate);
      // this.dailyDate = moment(daily).format("MM/DD/YYYY");
      // this.enddate = this.dailyDate;
      // if (this.enddate) {
      this.enddate = moment(this.selectedDate).format('MM/DD/YYYY');
    }

    if (this.packageType == 'Weekly') {
      this.enddate = moment(this.selectedDate)
        .add(1, 'week')
        .subtract(1, 'day')
        .format('MM/DD/YYYY');
    }

    if (this.packageType == 'Monthly') {
      this.enddate = moment(this.selectedDate)
        .add(1, 'month')
        .subtract(1, 'day')
        .format('MM/DD/YYYY');
    }
  }

  // else
  //   if (this.packageType == "Weekly") {
  //     let week = moment(this.selectedDate).add(6, 'days').format("YYYY-MM-DD");
  //     this.weeklyDate = moment(week).format("MM/DD/YYYY")
  //     this.enddate = this.weeklyDate;
  //     if (this.enddate) {
  //       this.finalEndDate = moment(this.enddate).format("YYYY-MM-DD");
  //     }
  //   } else if (this.packageType == "Monthly") {
  //     let month = moment(this.selectedDate).add(29, 'days').format("YYYY-MM-DD");
  //     this.monthlyDate = moment(month).format("MM/DD/YYYY")
  //     this.enddate = this.monthlyDate;
  //     if (this.enddate) {
  //       this.finalEndDate = moment(this.enddate).format("YYYY-MM-DD");
  //     }
  // }

  changePackage($event) {
    console.log($event);

    if (this.selectedDate) {
      let obj = {
        target: {
          value: this.selectedDate,
        },
      };
      this.dateChange(obj);
    }

    this.packageType = $event.detail.value;
    if ($event.detail.value == 'Daily') {
      this.dailyPackage = $event.detail.value;
    } else if ($event.detail.value == 'Weekly') {
      this.weeklyPackage = $event.detail.value;
    } else if ($event.detail.value == 'Monthly') {
      this.monthlyPackage = $event.detail.value;
    }
  }

  getSetDates($event) {
    console.log($event);
    const range = $event;

    this.startdate = range.from.format('MM/DD/YYYY');
    this.enddate = range.to.format('MM/DD/YYYY');

    console.log('item wali date', this.item.end_date);
    console.log('current date', this.enddate);

    if (this.enddate <= this.item.end_date) {
      this.enddate = range.to.format('MM/DD/YYYY');
    } else {
      this.utility.presentFailureToast('Please select available date');
      this.enddate = null;
    }

    // switch(this.ctype){
    //   case "daily":
    //     this.startdate = range.format('YYYY-MM-DD');
    //     this.enddate = range.format('YYYY-MM-DD');
    //   break;
    //   case "weekly":
    //     this.startdate = range.from.format('YYYY-MM-DD');
    //     this.enddate = range.to.format('YYYY-MM-DD');
    //   break;
    //   case "monthly":
    //     this.startdate = range.from.format('YYYY-MM-DD');
    //     this.enddate = range.to.format('YYYY-MM-DD');
    //   break;
    // }

    // switch(this.ctype){
    //   case "daily":
    //     this.enddate = range.format('YYYY-MM-DD');
    //   break;
    //   case "weekly":
    //     this.enddate = range.from.add(1, 'week').subtract(1, 'day').format('YYYY-MM-DD');
    //   break;
    //   case "monthly":
    //     this.enddate = range.from.add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');
    //   break;
    // }

    // this.dateRange = this.ctype == "daily" ? null : { from: moment(this.startdate), to: moment(this.enddate) };
  }
}
