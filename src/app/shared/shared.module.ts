import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PrintErrorComponent } from "./print-error/print-error.component";
import { MessageComponent } from "./message/message.component";
import { LoadingComponent } from "./loading/loading.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [
    PrintErrorComponent,
    MessageComponent,
    LoadingComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    PrintErrorComponent,
    MessageComponent,
    LoadingComponent,
    NotFoundComponent,
  ],
})
export class SharedModule {}
