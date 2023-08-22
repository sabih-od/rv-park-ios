import { Component, Injector, OnInit } from '@angular/core';
import { initialize } from '@ionic/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BasePage } from '../base-page/base-page';
import { CartPage } from '../cart/cart.page';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends BasePage implements OnInit {
  activeIndexId = 1;
  // role_id = 2;
  keyboardopen = false;

  constructor(injector: Injector, public fcm: FirebaseService,
    // public content: IonContent
  ) {
    super(injector);

  }

  async ngOnInit() {

    console.log('this.platform => ', this.platform)

    if (Capacitor.isNativePlatform()) {
      Keyboard.addListener('keyboardDidShow', info => {
        // this.content.scrollByPoint(0, info.keyboardHeight, 100)
        // alert('keyboard 1')
        this.keyboardopen = true;
        console.log('keyboard did show with height:', info.keyboardHeight);
      });

      Keyboard.addListener('keyboardWillShow', info => {
        // alert('keyboard 2')
        this.keyboardopen = true;
        console.log('keyboard will show with height:', info.keyboardHeight);
      });

      Keyboard.addListener('keyboardWillHide', () => {
        // alert('keyboard 3')
        this.keyboardopen = false;
        console.log('keyboard will hide');
      });

      Keyboard.addListener('keyboardDidHide', () => {
        // alert('keyboard 4')
        // this.content.scrollToTop();
        this.keyboardopen = false;
        console.log('keyboard did hide');
      });
    }

    console.log('dashboard', await this.users.getUserRoleId());
    console.log('user', await this.users.getUser());

    // await this.fcm.setupFMC();
    const token = localStorage.getItem('fcm_token');
    console.log('token', token);
    if (token) {
      await this.network.setFcmToken({ fcm_token: token }).then((res) => {
        console.log('responseOfToken', res);
      });
    }
  }

  async ionViewWillEnter() {
    // await this.fcm.setupFMC();
    const token = localStorage.getItem('fcm_token');
    console.log('token', token);
    if (token) {
      await this.network.setFcmToken({ fcm_token: token }).then((res) => {
        console.log('responseOfToken', res);
      });
    }
  }

  activeIndex($event) {
    console.log('$event', $event);
    this.activeIndexId = $event.id;
    if ($event.label == 'Cart') {
      this.modals.present(CartPage);
    } else {
      this.nav.push($event.route);
    }
  }
}
