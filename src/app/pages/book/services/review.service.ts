import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
import { environment } from "../../../../environments/environment";
import { MessageService } from "src/app/shared/message.service";

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  loading: boolean = false;
  constructor(
    private storage: Storage,
    private http: HTTP,
    private msgService: MessageService
  ) {}

  async create(stars, content, book_id) {
    this.loading = true;
    try {
      const token = await this.storage.get("token");
      const value = await this.http.post(
        `${environment.api}/review/create`,
        { book_id, stars, content },
        { Accept: "application/json", Authorization: "Bearer " + token }
      );
      this.loading = false;
      this.msgService.add("Review Added Successfully", "success");
      return { status: 200, message: "Review Added successfully" };
    } catch (error) {
      console.log(error);
      this.loading = false;
      console.log(error);
      if (error.status == 401) {
        this.msgService.add("Unauthorized", "danger");
      } else if (error.status == 422) {
        return { status: 422, error: error.error };
      } else if (error.status == 404) {
        return { status: 404 };
      } else {
        this.msgService.add("Internal Server Error.", "danger");
      }
    }
  }

  async getReview(book_id) {
    try {
      const token = await this.storage.get("token");
      const value = await this.http.get(
        `${environment.api}/review?book_id=${book_id}`,
        {},
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      );
      const res = JSON.parse(value.data);
      return { status: 200, reviews: res.reviews };
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        this.msgService.add("Unauthorized", "danger");
      } else if (error.status == 404) {
        return { status: 404, error: error.error };
      } else if (error.status == 500) {
        this.msgService.add("Internal Server Error", "danger");
      }
    }
  }
}
