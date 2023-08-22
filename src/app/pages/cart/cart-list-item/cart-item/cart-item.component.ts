import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Config } from 'src/app/config/main.config';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { CartPage } from '../../cart.page';
import { MenuDetailsPage } from 'src/app/pages/menu-details/menu-details.page';
import { ViewPropertyDetailComponent } from 'src/app/components/view-property-detail/view-property-detail.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent extends BasePage implements OnInit {

  loading = true;
  private _item;
  @Input()
  public get item(): any {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.initialize(value)
  }

  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  url;
  selectedPlot;
  price;
  datePurchased;
  location;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.url = Config.URL;
  };

  initialize(value) {

    console.log(value);
    this.loading = false;

  }

  getItemImage(item) {

    if (!item.park) {
      return 'assets/images/fl1.png';
    }
    var images = item?.park.park_images;
    if (images.length > 0) {
      const res = this.url + images[0]?.image_url;
      return res;
    } else {
      return 'assets/images/fl1.png';
    }

  }

  viewCartItem() {
    console.log('this.item => ', this.item)
    this.modals.present(ViewPropertyDetailComponent, { item_id: this.item.park.id })
  }

  deleteItem() {
    this.delete.emit(this.item)
  }


}
