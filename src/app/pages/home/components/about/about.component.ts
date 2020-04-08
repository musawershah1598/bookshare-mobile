import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import {
  ModalController,
  ActionSheetController,
  AlertController
} from "@ionic/angular";
import { ProfileUpdateComponent } from "../../modals/profile-update/profile-update.component";
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from "@ionic-native/camera/ngx";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  providers: [Camera]
})
export class AboutComponent implements OnInit {
  user: any;
  constructor(
    public authService: AuthService,
    private modal: ModalController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.authService.getUser().then(val => {
      this.user = val;
      console.log(this.user);
    });
  }

  async showCameraOption() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Choose...",
      backdropDismiss: false,
      buttons: [
        {
          text: "Camera",
          icon: "camera-outline",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Gallery",
          icon: "file-tray-full-outline",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Close",
          icon: "close-outline",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  async takePicture(pictureSourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      sourceType: pictureSourceType
    };
    this.camera.getPicture(options).then(val => {
      let base64Url = "data:image/jpeg;base64," + val;
      this.authService.uploadPicture(base64Url).then(async val => {
        if (val) {
          const alert = await this.alertCtrl.create({
            header: "Alert",
            message: "Profile Image updated successfully",
            backdropDismiss: false,
            buttons: [
              {
                text: "Close",
                role: "cancel"
              }
            ]
          });
          await alert.present();
          alert.onDidDismiss().then(() => {
            this.ngOnInit();
          });
        }
      });
    });
  }

  async logout() {
    this.authService.logout();
  }

  async openModal() {
    const modal = await this.modal.create({
      component: ProfileUpdateComponent,
      componentProps: { user: this.user }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data.forceClose) {
      this.ngOnInit();
    }
  }
}
