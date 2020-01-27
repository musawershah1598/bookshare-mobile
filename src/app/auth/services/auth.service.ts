import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage";
import { MessageService } from "src/app/shared/message.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);
  errors: any;
  loading: boolean = false;
  constructor(
    private http: HTTP,
    private storage: Storage,
    private msgService: MessageService,
    private router: Router
  ) {
    this.storage.get("token").then(val => {
      if (val) {
        this.authenticationState.next(true);
      }
    });
  }

  async register({ name, email, password, confirmPassword }) {
    const data = {
      name,
      email,
      password,
      confirm_password: confirmPassword
    };
    const value = await this.http.post(
      "https://seertechservices.com/bookshare/api/auth/register",
      data,
      {
        "Content-Type": "application/json"
      }
    );
    return value;
  }

  async login({ email, password }) {
    this.loading = true;
    const data = {
      email,
      password
    };
    try {
      const value = await this.http.post(
        "https://seertechservices.com/bookshare/api/auth/login",
        data,
        {
          "Content-Type": "application/json"
        }
      );
      const res = JSON.parse(value.data);
      await this.storage.set("token", res.token);
      this.authenticationState.next(true);
      this.loading = false;
      await this.msgService.add("Login Successfull", "success");
      setTimeout(() => {
        this.router.navigateByUrl("/pages/home");
      }, 4000);
    } catch (error) {
      console.log(error);
      if (error.status == 400) {
        this.errors = JSON.parse(error.error);
        console.log(this.errors);
        setTimeout(() => {
          this.errors = null;
        }, 5000);
      } else if (error.status == 401) {
        const errors = JSON.parse(error.error);
        this.msgService.add(errors.error, "danger");
      } else {
        this.msgService.add("Internal Server Error", "danger");
      }
      this.loading = false;
    }
  }
}
