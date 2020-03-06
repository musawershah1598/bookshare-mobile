import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.scss"]
})
export class ProfileUpdateComponent implements OnInit {
  gender: string = "male";
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async close() {
    await this.modalCtrl.dismiss({ dismiss: true });
  }

  changeRadio(item) {
    this.gender = item;
  }
}
