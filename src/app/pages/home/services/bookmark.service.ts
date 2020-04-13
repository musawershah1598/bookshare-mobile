import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Storage } from "@ionic/storage";
import { environment } from "../../../../environments/environment";
import { MessageService } from "src/app/shared/message.service";

@Injectable({
  providedIn: "root",
})
export class BookmarkService {
  constructor(
    private storage: Storage,
    private http: HTTP,
    private msgService: MessageService
  ) {}

  async getbookmarks() {
    try {
      const token = await this.storage.get("token");
      const value = await this.http.get(
        `${environment.api}/bookmark`,
        {},
        { Accept: "application/json", Authorization: "Bearer " + token }
      );
      const res = JSON.parse(value.data);
      return res.bookmarks;
    } catch (error) {
      if (error.status == 401) {
        this.msgService.add("Unauthenticated", "danger");
      } else {
        this.msgService.add("Internal Server Error", "danger");
      }
    }
  }

  async addbookmark(book_id) {
    try {
      const token = await this.storage.get("token");
      const value = await this.http.post(
        `${environment.api}/bookmark/add`,
        { book_id },
        {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        this.msgService.add("Unauthenticated", "danger");
      } else if (error.status == 422) {
        this.msgService.add("Book id is required", "danger");
      } else if (error.status == 404) {
        this.msgService.add("Book not found", "danger");
      } else if (error.status == 400) {
        this.msgService.add("Book already bookmarked", "warning");
      } else {
        this.msgService.add("Internal Server Error", "danger");
      }
      return false;
    }
  }

  async checkbookmark(book_id) {
    try {
      const token = await this.storage.get("token");
      const value = await this.http.get(
        `${environment.api}/bookmark/check?book_id=` + book_id,
        {},
        {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        this.msgService.add("Unauthenticated", "danger");
      } else if (error.status == 422) {
        this.msgService.add("Book id is required", "danger");
      } else if (error.status == 404) {
        return false;
      } else {
        this.msgService.add("Internal Server Error", "danger");
      }
    }
  }

  async remove(book_id) {
    try {
      const token = await this.storage.get("token");
      const value = await this.http.post(
        `${environment.api}/bookmark/remove`,
        { id: book_id },
        {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        this.msgService.add("Unauthenticated", "danger");
      } else if (error.status == 422) {
        this.msgService.add("Book id is required", "danger");
      } else if (error.status == 404) {
        this.msgService.add("Bookmark not found", "danger");
      } else {
        this.msgService.add("Internal Server Error", "danger");
      }
      return false;
    }
  }
}
