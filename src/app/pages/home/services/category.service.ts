import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
import { MessageService } from "src/app/shared/message.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(
    private storage: Storage,
    private http: HTTP,
    private msgService: MessageService
  ) {}

  async getCategories() {
    try {
      const token = await this.storage.get("token");
      const value = await this.http.get(
        `${environment.api}/genre`,
        {},
        {
          Accept: "application/json",
        }
      );

      console.log(value);
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        this.msgService.add("Unauthenticated", "danger");
      } else {
        this.msgService.add("Internal Server Error", "danger");
      }
    }
  }
}
