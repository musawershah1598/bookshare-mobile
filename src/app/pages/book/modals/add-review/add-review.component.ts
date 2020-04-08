import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ReviewService } from "../../services/review.service";

@Component({
  selector: "app-add-review",
  templateUrl: "./add-review.component.html",
  styleUrls: ["./add-review.component.scss"]
})
export class AddReviewComponent implements OnInit {
  book_id: any;
  rating: any;
  content: any;
  error: Array<any> = [];
  constructor(
    public reviewService: ReviewService,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    console.log(this.book_id);
  }

  async cancel() {
    this.popoverCtrl.dismiss({ forceClose: true });
  }

  async addReview() {
    if (!this.rating) {
      this.error.push("Rating is required");
    }
    if (!this.content || this.content == "") {
      this.error.push("Content is required");
    }
    if (this.error.length > 0) {
      setTimeout(() => {
        this.error = [];
      }, 4000);
    } else {
      const res = await this.reviewService.create(
        this.rating,
        this.content,
        this.book_id
      );
      if (res.status == 422) {
        this.error = JSON.parse(res.error);
        setTimeout(() => {
          this.error = [];
        }, 4000);
      } else if (res.status == 404) {
        this.error = ["Book Not found."];
        setTimeout(() => {
          this.error = [];
        }, 4000);
      } else if (res.status == 200) {
        setTimeout(() => {
          this.popoverCtrl.dismiss({ forceClose: false });
        }, 4000);
      }
    }
  }
}
