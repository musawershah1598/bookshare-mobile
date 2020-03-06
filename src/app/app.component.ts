import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  loading: boolean = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get("firstTime").then(val => {
        if (val) {
          this.storage.get("token").then(token => {
            if (token) {
              this.router.navigateByUrl("/pages/home");
            } else {
              this.router.navigateByUrl("/basic");
            }
          });
        } else {
          this.router.navigateByUrl("/home");
        }
        this.loading = false;
      });
      // this.authService.authenticationState.subscribe(val => {
      //   if (val) {
      //     this.router.navigateByUrl("/pages/home");
      //     this.loading = false;
      //   } else {
      //     this.storage.get("firstTime").then(firstTime => {
      //       if (firstTime) {
      //         this.router.navigateByUrl("/basic");
      //       } else {
      //         this.router.navigateByUrl("/home");
      //       }
      //       this.loading = false;
      //     });
      //   }
      // });
    });
  }
}
