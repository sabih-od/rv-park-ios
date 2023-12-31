import { BasePage } from 'src/app/pages/base-page/base-page';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sclist',
  templateUrl: './sclist.component.html',
  styleUrls: ['./sclist.component.scss'],
})
export class SclistComponent extends BasePage implements OnInit {

  loading = true;
  cities: any[] = [];
  searchTerm: any;
  @Input() city;
  isModal: any;
  constructor(injector: Injector, public data: DataService) {
    super(injector);
    this.initialize();
   }

  ngOnInit() {

  }
  back(){
    this.modals.dismiss();
  }
 async initialize(){
    let data = await this.data.getStates() as any[];
    this.cities = data;
    console.log(this.cities);
    this.loading = false;
  }

  selectState(item){
    this.modals.dismiss({data: item});
  }

}
