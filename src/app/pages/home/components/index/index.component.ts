import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";

import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
  providers: [PhotoViewer]
})
export class IndexComponent implements OnInit {
  topPicks: any = [];
  topPickOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
    width: 350
  };

  bestSellerOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
    width: 400
  };

  constructor(
    private router: Router,
    public bookService: BookService,
    private photoViewer: PhotoViewer
  ) {}

  ngOnInit() {
    this.bookService.getbooks().then(val => {
      if (val) {
        this.topPicks = val;
        this.topPicks.forEach(item => {
          item.photo =
            "https://seertechservices.com/bookshare/public/storage/book_images/" +
            item.genre.name +
            "/" +
            item.photo;
        });
        console.log(this.topPicks);
      }
    });
  }

  openBook(book) {
    this.router.navigate(["/book", { book: JSON.stringify(book) }]);
  }

  openImage(photo) {
    this.photoViewer.show(photo, "Book Image");
  }
}
