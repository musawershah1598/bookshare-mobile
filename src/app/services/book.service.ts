import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Storage } from "@ionic/storage";
import { MessageService } from "../shared/message.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class BookService {
  loading: boolean = false;
  constructor(
    private http: HTTP,
    private storage: Storage,
    private msgService: MessageService
  ) {}

  async getbooks() {
    this.loading = true;
    try {
      const token = await this.storage.get("token");
      const url = `${environment.api}/books`;
      const value = await this.http.get(
        url,
        {},
        { Authorization: "Bearer " + token, Accept: "application/json" }
      );
      const res = JSON.parse(value.data);
      this.loading = false;
      return res;
    } catch (error) {
      console.log(error);
      if (error.status == -3) {
        this.msgService.add("Please enable your internet", "danger");
      }
      if (error.status == 401) {
        this.msgService.add("Unauthenticated", "danger");
      } else if (error.status == 404) {
        this.msgService.add("No book found", "warning");
      } else if (error.status == 500) {
        this.msgService.add("Internal Server error", "danger");
      }
      this.loading = false;
    }
  }

  async search(term) {
    this.loading = true;
    try {
      const token = await this.storage.get("token");
      const value = await this.http.get(
        `${environment.api}/books/search`,
        { term },
        {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      );
      const res = JSON.parse(value.data);
      this.loading = false;
      return res;
    } catch (error) {
      if (error.status == 404) {
        this.loading = false;
        return false;
      }
    }
  }

  async addView(id) {
    const token = await this.storage.get("token");
    const value = await this.http.get(
      `${environment.api}/books/addview?id=${id}`,
      {},
      {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    );
    console.log(value);
  }

  async addDownload(id) {
    const token = await this.storage.get("token");
    const value = await this.http.get(
      `${environment.api}/books/adddownload?id=${id}`,
      {},
      {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    );
    console.log(value);
  }
}
