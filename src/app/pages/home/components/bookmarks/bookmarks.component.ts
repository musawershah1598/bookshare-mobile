import { Component, OnInit } from "@angular/core";

import { BookmarkService } from "../../services/bookmark.service.js";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-bookmarks",
  templateUrl: "./bookmarks.component.html",
  styleUrls: ["./bookmarks.component.scss"],
  providers: [PhotoViewer],
})
export class BookmarksComponent implements OnInit {
  loading: boolean = false;
  data: Array<any> = [];

  constructor(
    private bookmarkService: BookmarkService,
    private photoViewer: PhotoViewer,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.bookmarkService.getbookmarks().then((val) => {
      if (val) {
        this.data = val;
        this.data.forEach((item) => {
          item["photo"] =
            "https://seertechservices.com/bookshare/public/storage/book_images/" +
            item.genre.name +
            "/" +
            item.book.photo;
        });
      }
      this.loading = false;
    });
  }

  openImage(photo) {
    this.photoViewer.show(photo, "Photo");
  }

  openBook(book) {
    this.router.navigate(["/book", { book: JSON.stringify(book) }]);
  }
}
