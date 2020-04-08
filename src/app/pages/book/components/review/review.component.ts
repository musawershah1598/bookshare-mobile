import { Component, OnInit, Input } from "@angular/core";
import { ReviewService } from "../../services/review.service";
import { PopoverController } from "@ionic/angular";
import { AddReviewComponent } from "../../modals/add-review/add-review.component";

import * as moment from "moment";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit {
  @Input("id") book_id: any;
  content: string = "";
  rating: any;
  error: Array<any> = [];
  reviews: Array<any> = [];
  loading: boolean = false;
  constructor(
    public reviewService: ReviewService,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.loading = true;
    this.reviewService.getReview(this.book_id).then(val => {
      this.loading = false;
      if (val.status == 404) {
        this.error = ["Book Not Found"];
        setTimeout(() => {
          this.error = [];
        }, 4000);
      } else {
        this.reviews = val.reviews;
        console.log(this.reviews);
      }
    });
  }

  formatTime(time) {
    return moment(time).fromNow();
  }

  async addReview() {
    const popover = await this.popoverCtrl.create({
      component: AddReviewComponent,
      cssClass: "add-review",
      backdropDismiss: false,
      componentProps: { book_id: this.book_id }
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (!data.forceClose) {
      this.ngOnInit();
    }
  }
}
