import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-score-screen",
  templateUrl: "./score-screen.component.html",
  styleUrls: ["./score-screen.component.scss"],
})
export class ScoreScreenComponent implements OnInit {
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
