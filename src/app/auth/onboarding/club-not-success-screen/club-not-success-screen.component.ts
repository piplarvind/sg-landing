import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-club-not-success-screen",
  templateUrl: "./club-not-success-screen.component.html",
  styleUrls: ["./club-not-success-screen.component.scss"],
})
export class ClubNotSuccessScreenComponent implements OnInit {
  androidApp: any = "";
  iosApp: any = "";
  constructor(private router: Router) {}

  ngOnInit() {
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
