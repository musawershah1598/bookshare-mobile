import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { MessageService } from "src/app/shared/message.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  errors: any;
  loading: boolean = false;
  constructor(
    private location: Location,
    private authService: AuthService,
    private msgService: MessageService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        this.matchValues("password")
      ])
    });
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }
  async onSubmit() {
    this.loading = true;
    try {
      const value = await this.authService.register(this.form.value);
      const res = JSON.parse(value.data);
      const message = res.success.message;
      this.msgService.add(message, "success");
      setTimeout(() => {
        this.router.navigateByUrl("/login");
      }, 5000);
      this.loading = false;
    } catch (error) {
      if ((error.status = 401)) {
        this.errors = JSON.parse(error.error);
        this.loading = false;
        setTimeout(() => {
          this.errors = null;
        }, 5000);
      }
    }
  }
}
