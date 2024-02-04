import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-success-reponse-screen",
  templateUrl: "./success-reponse-screen.component.html",
  styleUrls: ["./success-reponse-screen.component.scss"],
})
export class SuccessReponseScreenComponent implements OnInit {
  androidApp: any = "";
  iosApp: any = "";
  constructor(private router: Router) {}

  ngOnInit() {
    this.androidApp =
      "https://play.google.com/store/apps/details?id=com.sportgritllc.sportgrit";
    this.iosApp = "https://apps.apple.com/in/app/sportgrit/id6463651948";
    localStorage.removeItem("userId");
    localStorage.removeItem("sportId");
    localStorage.removeItem("genderId");
    localStorage.removeItem("userType");
    localStorage.removeItem("selectedRoleValue");
    localStorage.removeItem("clubId");
  }

  goToLogin(): void {
    this.router.navigateByUrl("/login");
  }
}
