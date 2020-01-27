import { Injectable } from "@angular/core";
import uuid from "uuid";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  messages: Array<any> = [];

  constructor() {}

  add(text, type, timeout: number = 3000) {
    const id = uuid.v4();
    const message = {
      id,
      text,
      type
    };
    this.messages.push(message);
    setTimeout(() => {
      this.messages = this.messages.filter(item => {
        item.id != id;
      });
    }, timeout);
  }
}
