import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/services/auth.service";
import { MessageService } from "src/app/shared/message.service";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.scss"]
})
export class ProfileUpdateComponent implements OnInit {
  gender: string = "";
  user: any;
  form: FormGroup;
  errors: any;
  constructor(
    private modalCtrl: ModalController,
    public authService: AuthService,
    private msgService: MessageService
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      gender: new FormControl("")
    });
  }

  ngOnInit() {
    this.form.reset(this.user);
    console.log(this.form.value);
  }

  async close() {
    await this.modalCtrl.dismiss({ forceClose: true });
  }

  changeRadio(item) {
    this.gender = item;
  }

  async onSubmit() {
    this.authService.updateUser(this.form.value).then(val => {
      if (val.status == 422) {
        this.errors = JSON.parse(val.error);
        setTimeout(() => {
          this.errors = null;
        }, 4000);
      } else if (val.status >= 400) {
        this.msgService.add("An error occurred during updation", "danger");
      } else {
        this.msgService.add("Details Updated Successfully", "success");
        setTimeout(() => {
          this.modalCtrl.dismiss({ forceClose: false });
        }, 4000);
      }
    });
  }
}
