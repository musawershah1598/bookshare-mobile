import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrintErrorComponent } from "./print-error/print-error.component";
import { MessageComponent } from "./message/message.component";

@NgModule({
  declarations: [PrintErrorComponent, MessageComponent],
  imports: [CommonModule],
  exports: [PrintErrorComponent, MessageComponent]
})
export class SharedModule {}
