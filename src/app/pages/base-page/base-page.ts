import { Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, MenuController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { UtilityService } from 'src/app/services/utility.service';
import { EventsService } from 'src/app/services/basic/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { StorageService } from 'src/app/services/basic/storage.service';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
// import { ImageService } from 'src/app/services/image.service';
import { AlertsService } from 'src/app/services/basic/alerts.service';
// import { PermissionService } from 'src/app/services/permission.service';
import { StringsService } from 'src/app/services/basic/strings.service';
import { FormErrorsService } from 'src/app/services/basic/form-errors.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ImageService } from 'src/app/services/image.service';

export abstract class BasePage {
  public formErrors: FormErrorsService;
  public platform: Platform;
  public formBuilder: FormBuilder;
  public menuCtrl: MenuController;
  public modals: ModalService;
  public nav: NavService;
  public utility: UtilityService;
  public events: EventsService;
  public network: NetworkService;
  public storage: StorageService;
  public users: UserService;
  public dataService: DataService;
  public guard: AuthGuardService;
  // public image: ImageService;
  public alert: AlertsService;
  // public permission: PermissionService;
  public strings: StringsService;
  public imageService: ImageService;

  constructor(injector: Injector) {
    this.imageService = injector.get(ImageService);
    this.formErrors = injector.get(FormErrorsService);
    this.platform = injector.get(Platform);
    this.formBuilder = injector.get(FormBuilder);
    this.menuCtrl = injector.get(MenuController);
    this.alert = injector.get(AlertsService);
    this.nav = injector.get(NavService);
    this.modals = injector.get(ModalService);
    this.utility = injector.get(UtilityService);
    this.events = injector.get(EventsService);
    this.network = injector.get(NetworkService);
    this.users = injector.get(UserService);
    this.storage = injector.get(StorageService);
    this.dataService = injector.get(DataService);
    this.guard = injector.get(AuthGuardService);
    // this.image = injector.get(ImageService);
    // this.permission = injector.get(PermissionService);
    this.strings = injector.get(StringsService);
  }
}
