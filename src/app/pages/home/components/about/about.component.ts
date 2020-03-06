import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { ModalController } from "@ionic/angular";
import { ProfileUpdateComponent } from "../../modals/profile-update/profile-update.component";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private modal: ModalController
  ) {}

  ngOnInit() {}

  async logout() {
    this.authService.logout();
  }

  async openModal() {
    const modal = await this.modal.create({
      component: ProfileUpdateComponent
    });
    await modal.present();
  }
}
