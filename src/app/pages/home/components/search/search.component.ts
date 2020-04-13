import { Component, OnInit } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  term: string = "";
  data: Array<any> = [];
  notFound: any;
  constructor(public bookService: BookService, private router: Router) {}

  ngOnInit() {}

  async search() {
    this.data = [];
    this.notFound = null;
    if (this.term != "") {
      const data = await this.bookService.search(this.term);
      if (data == false) {
        this.data = [];
        this.notFound = "A book with the given title or author not found.";
      } else {
        this.data = data;
        this.data.forEach((item) => {
          item["show"] = false;
        });
      }
    } else {
      this.data = [];
      this.notFound = null;
    }
  }

  viewBook(book) {
    console.log(book);
    this.router.navigate(["/book", { book: JSON.stringify(book) }]);
  }
}
