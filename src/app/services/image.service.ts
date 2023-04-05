import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {
  Camera as CordovaCamera,
  CameraOptions,
} from '@awesome-cordova-plugins/camera/ngx';
import { AlertsService } from './basic/alerts.service';
import { ModalService } from './basic/modal.service';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    public actionSheetController: ActionSheetController,
    private cordovaCamera: CordovaCamera,
    public modals: ModalService,
    public alerts: AlertsService,
  ) {}

  openCamera() {
    return new Promise(async (resolve) => {
      const radioOptions = [
        {
          type: 'radio',
          label: 'Camera',
          value: '1',
          checked: false,
        },
        {
          type: 'radio',
          label: 'Gallery',
          value: '0',
          checked: false,
        },
      ];

      const option = await this.alerts.presentRadioSelections(
        'Select From',
        '',
        radioOptions
      );

      if (option == null) {
        resolve(null);
        return;
      }

      const options: CameraOptions = {
        quality: 100,
        targetWidth: 512,
        targetHeight: 512,
        saveToPhotoAlbum: false,
        destinationType: this.cordovaCamera.DestinationType.DATA_URL,
        encodingType: this.cordovaCamera.EncodingType.JPEG,
        mediaType: this.cordovaCamera.MediaType.PICTURE,
        sourceType: parseInt(option, 10),
      };

      resolve(await this.showCamera(options));
    });

    // return new Promise<any>((res) => {
    //   const cameraOptions: ImageOptions = {
    //     width: 200,
    //     resultType: CameraResultType.Base64,
    //     source: CameraSource.Photos,
    //   };
    //   Camera.getPhoto(cameraOptions).then(
    //     async (imageData) => {
    //       // console.log('imageData', imageData.base64String);
    //       if (this.isPngOrJpg(imageData.base64String)) {
    //         let base64 = 'data:image/png;base64,' + imageData.base64String;
    //         let blob = await this.base64ToBlob(base64);
    //         res({ base64, blob });
    //       } else {
    //         this.utility.presentFailureToast(
    //           'Invalid format. Only PNG and JPG are supported'
    //         );
    //         res(null);
    //       }
    //     },
    //     (err) => {
    //       res(null);
    //     }
    //   );
    // });
  }

  async showCamera(options) {
    return new Promise((res) => {
      this.cordovaCamera.getPicture(options).then((imageData) => {
        res('data:image/jpeg;base64,' + imageData);
      });
    });
  }

  isPngOrJpg(base64) {
    return (
      base64.startsWith('/') || // jpg
      base64.startsWith('i') // png
    );
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.cordovaCamera.DestinationType.FILE_URI,
      encodingType: this.cordovaCamera.EncodingType.JPEG,
      mediaType: this.cordovaCamera.MediaType.ALLMEDIA,
    };
    this.cordovaCamera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        console.log(imageData);

        // this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }


  base64ToBlob(base64) {
    return new Promise((resolve) => {
      fetch(base64)
        .then((res) => res.blob())
        .then((res) => {
          console.log('Successfully made blob', res);
          resolve(res);
        })
        .catch((err) => {
          console.log('Unsucess', err);
          resolve(null);
        });
    });
  }

}
