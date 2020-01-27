import { Component, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  doneBtn: boolean = false;
  @ViewChild("slides", { static: false }) ionSlides: IonSlides;
  constructor(private router: Router, private storage: Storage) {}

  ionViewWillEnter() {
    this.storage.get("firstTime").then(val => {
      if (val) {
        this.router.navigateByUrl("/basic");
      }
    });
  }

  doCheck() {
    let opt1 = this.ionSlides.isEnd();
    opt1.then(val => {
      if (val) {
        this.doneBtn = true;
      }
    });
  }

  async goToBasic() {
    await this.storage.set("firstTime", true);
    this.router.navigateByUrl("/basic");
  }
}
