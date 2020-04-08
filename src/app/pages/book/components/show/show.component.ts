import { Component, OnInit, NgZone } from "@angular/core";

import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { File, FileReader } from "@ionic-native/file/ngx";

import { WebView } from "@ionic-native/ionic-webview/ngx";

import { Httpd, HttpdOptions } from "@ionic-native/httpd/ngx";

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"],
  providers: [File, WebView, Httpd]
})
export class ShowComponent implements OnInit {
  link: any;
  src: any;

  serverUrl: any;

  constructor(
    public DomSanitizer: DomSanitizer,
    private file: File,
    private webview: WebView,
    private httpd: Httpd,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.file
      .readAsArrayBuffer(this.file.dataDirectory, this.link)
      .then(val => {
        this.src = new Uint8Array(val);
      });
  }

  // startLocalServer() {
  //   const options: HttpdOptions = {
  //     www_root: this.file.dataDirectory.replace("file://", ""),
  //     port: 9000,
  //     localhost_only: true
  //   };
  //   this.httpd.startServer(options).subscribe(url => {
  //     this.ngZone.run(() => {
  //       this.serverUrl = url;
  //     });
  //   });
  // }
}
