// home.component.ts
import { Component, ElementRef, OnInit } from "@angular/core";
import { HomeService } from "@app/pages/home/home.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  providers: [HomeService]
})
export class FooterComponent implements OnInit {
  android_app_url: string;
  ios_app_url: string;
  year = new Date().getFullYear();
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {}

  getSettingData() {
    this.homeService
      .getSettingData()
      .then((e: any) => {
        const settingObj = e.data;
        // console.log("setting obj", settingObj);
        // this.settingData = obj;
        for (const itemKey in settingObj) {
          if (settingObj.hasOwnProperty(itemKey)) {
            const key = settingObj[itemKey].key;
            if (key === "android_app") {
              this.android_app_url = settingObj[itemKey].value;
            }
            if (key === "ios_app") {
              this.ios_app_url = settingObj[itemKey].value;
            }
            // console.log(`Key: ${key}, Value: ${value}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

}
