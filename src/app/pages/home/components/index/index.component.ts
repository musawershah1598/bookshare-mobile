import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  topPickOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2,
    centeredSlides: true,
    width: 350
  };

  bestSellerOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
    width: 400
  };

  constructor() {}

  ngOnInit() {}
}
