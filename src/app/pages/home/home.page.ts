import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  current: string = "home";

  constructor() {}

  ngOnInit() {}

  changeNavigation(item) {
    this.current = item;
  }
}
