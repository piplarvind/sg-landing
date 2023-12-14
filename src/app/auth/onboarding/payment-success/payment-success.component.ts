import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HomeService } from "@app/pages/home/home.service";
import { environment } from "@env/environment";

@Component({
  selector: "app-payment-success",
  templateUrl: "./payment-success.component.html",
  styleUrls: ["./payment-success.component.scss"],
})
export class PaymentSuccessComponent implements OnInit {
  android_app_url: string;
  ios_app_url: string;
  newEnv: any = environment;
  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit() {
    localStorage.removeItem("userId");
    localStorage.removeItem("sportId");
    localStorage.removeItem("genderId");
    localStorage.removeItem("userType");
    localStorage.removeItem("selectedRoleValue");
    localStorage.removeItem("clubId");
    this.getSettingData();
  }

  goToLogin(): void {
    this.router.navigateByUrl("/login");
  }

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
