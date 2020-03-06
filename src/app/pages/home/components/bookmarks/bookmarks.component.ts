import { Component, OnInit } from "@angular/core";

import { data } from "./data.js";

@Component({
  selector: "app-bookmarks",
  templateUrl: "./bookmarks.component.html",
  styleUrls: ["./bookmarks.component.scss"]
})
export class BookmarksComponent implements OnInit {
  booksData: Array<any>;
  colors = ["#2ecc71", "#8e44ad", "#34495e", "#f1c40f", "#3498db"];
  constructor() {}

  ngOnInit() {
    this.booksData = data;
    let index = 0;
    this.booksData = this.booksData.map(item => {
      if (index >= this.colors.length) {
        index = 0;
      }
      item["color"] = this.colors[index];
      index++;
      return item;
    });
    console.log(this.booksData);
  }
}
