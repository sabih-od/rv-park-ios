import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ModalService } from 'src/app/services/basic/modal.service';
import { SwiperComponent } from 'swiper/angular';
import { HomeSwitcherComponent } from '../dashboard/components/home-switcher/home-switcher.component';
import { UserService } from 'src/app/services/user.service';
import { InAppBrowser, InAppBrowserEvent } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, AfterViewInit {

  @Input() selectedPackageId;
  @Input() item;
  @ViewChild('swiper', { static: false }) swiper?: IonSlides;

  loading = true;
  constructor(public modals: ModalService, public cartServ: CartService, public users: UserService, private iab: InAppBrowser) { }

  ngAfterViewInit(): void {
    this.swiper?.lockSwipes(true);
  }

  ngOnInit() {
    console.log("cart initialized");
    this.initialize();
  }

  async initialize() {
    this.loading = true;
    const res = await this.cartServ.fetchCart();
    console.log(res);
    this.loading = false;
  }

  beforeLoadFunction(event: InAppBrowserEvent): void {
    const browser = event.target as any;

    // Check the platform to use the appropriate code
    if (browser['_platform'] === 'ios') {
      browser.executeScript({
        code: `document.getElementById('doneButton').innerHTML = 'Cancel';`
      });
    } else if (browser['_platform'] === 'android') {
      browser.executeScript({
        code: `document.getElementById('toolbar').querySelector('.done').innerHTML = 'Cancel';`
      });
    }
  }

  toCheckout(index) {
    if (index < 2) {

      let userId = this.users.user.id;
      let url = `https://kjrvportal.com/payment?amount=${this.cartServ.net_total}&user_id=${userId}&card_id=${this.cartServ.cart.id}`;
      // window.open(url, '_blank')
      var self = this;

      //  beforeload: 
      let icc = this.iab.create(url, '_blank', { location: 'no', toolbar: 'no', closebuttoncaption: 'Close', });

      icc.on('loadstart').subscribe(event => {
        if (event.url === 'https://kjrvportal.com/') {
          icc.close();
        }
      });

      icc.on('beforeload').subscribe(() => {
        this.beforeLoadFunction.bind(self);
      })

      icc.on('exit').subscribe(() => {
        self.swiper?.lockSwipes(false);
        self.swiper?.slideTo(index);
        self.swiper?.lockSwipes(true);
      });


    } else {
      this.modals.dismiss({
        timestamp: Date.now(),
      });
    }
  }

  toOut(num) {
    if (num == 1) {
      this.modals.dismiss({
        timestamp: Date.now(),
      });
    } else {
      this.swiper?.lockSwipes(false);
      this.swiper?.slidePrev();
      this.swiper?.lockSwipes(true);
    }
  }
}
