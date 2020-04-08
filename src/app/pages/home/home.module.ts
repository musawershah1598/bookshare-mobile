import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { IndexComponent } from "./components/index/index.component";
import { SearchComponent } from "./components/search/search.component";
import { BookmarksComponent } from "./components/bookmarks/bookmarks.component";
import { AboutComponent } from "./components/about/about.component";
import { ProfileUpdateComponent } from "./modals/profile-update/profile-update.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    IndexComponent,
    SearchComponent,
    BookmarksComponent,
    AboutComponent,
    ProfileUpdateComponent
  ],
  entryComponents: [ProfileUpdateComponent]
})
export class HomePageModule {}
