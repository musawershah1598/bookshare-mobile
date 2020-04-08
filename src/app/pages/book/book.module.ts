import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BookPageRoutingModule } from "./book-routing.module";

import { BookPage } from "./book.page";
import { ShowComponent } from "./components/show/show.component";
import { ReviewComponent } from "./components/review/review.component";

import { PdfViewerModule } from "ng2-pdf-viewer";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { SharedModule } from "src/app/shared/shared.module";
import { IonicRatingModule } from "ionic-rating";
import { AddReviewComponent } from "./modals/add-review/add-review.component";
import { DetailsComponent } from "./components/details/details.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    IonicRatingModule,
    BookPageRoutingModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [
    BookPage,
    ShowComponent,
    ReviewComponent,
    AddReviewComponent,
    DetailsComponent
  ],
  entryComponents: [ShowComponent, AddReviewComponent]
})
export class BookPageModule {}
