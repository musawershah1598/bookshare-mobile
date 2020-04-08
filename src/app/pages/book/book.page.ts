import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  DocumentViewer,
  DocumentViewerOptions
} from "@ionic-native/document-viewer/ngx";

import { FileOpener } from "@ionic-native/file-opener/ngx";

import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "app-book",
  templateUrl: "./book.page.html",
  styleUrls: ["./book.page.scss"],
  providers: [DocumentViewer, File, FileTransfer, FileOpener]
})
export class BookPage implements OnInit {
  book: any;

  current: string = "details";

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.book = this.route.snapshot.paramMap.get("book");
    this.book = JSON.parse(this.book);
    this.book.pdf =
      "https://seertechservices.com/bookshare/public/storage/books/" +
      this.book.genre.name +
      "/" +
      this.book.link;
  }

  ngOnInit() {
    this.bookService.addView(this.book.id);
  }

  changeSegment(e) {
    this.current = e.target.value;
  }
}
