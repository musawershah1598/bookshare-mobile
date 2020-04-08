import { Component, OnInit, Input } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { BookService } from "src/app/services/book.service";
import { LoadingController, ToastController } from "@ionic/angular";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  @Input("book") book: any;

  constructor(
    private file: File,
    private fileOpener: FileOpener,
    private bookService: BookService,
    private loadingCtrl: LoadingController,
    private fileTransfer: FileTransfer,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    console.log(this.book);
  }

  async viewBook() {
    try {
      const isPresent = await this.file.checkFile(
        this.file.dataDirectory,
        this.book.link
      );
      if (isPresent) {
        this.fileOpener
          .open(this.file.dataDirectory + this.book.link, "application/pdf")
          .then(val => {
            console.log("opened");
          });
        // const showModal = await this.modalCtrl.create({
        //   component: ShowComponent,
        //   componentProps: { link: this.book.link }
        // });
        // await showModal.present();
      }
    } catch (error) {
      if (error.code == 1) {
        const loading = await this.loadingCtrl.create({
          message: "Downloading pdf..."
        });
        await loading.present();
        this.bookService.addDownload(this.book.id);
        const transfer = this.fileTransfer.create();
        transfer
          .download(this.book.pdf, this.file.dataDirectory + this.book.link)
          .then(async entry => {
            await loading.dismiss();
            this.viewBook();
          });
      }
    }
  }

  async downloadBook() {
    const loading = await this.loadingCtrl.create({
      message: "Downloading pdf..."
    });
    await loading.present();
    this.bookService.addDownload(this.book.id);
    const transfer = this.fileTransfer.create();
    transfer
      .download(this.book.pdf, this.file.externalRootDirectory + this.book.link)
      .then(async entry => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: "Book saved to " + this.file.externalRootDirectory,
          duration: 5000,
          buttons: [
            {
              text: "Close",
              role: "cancel"
            }
          ]
        });
        toast.present();
      });
  }
}
