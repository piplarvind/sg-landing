import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-success-reponse-screen",
  templateUrl: "./success-reponse-screen.component.html",
  styleUrls: ["./success-reponse-screen.component.scss"],
})
export class SuccessReponseScreenComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // localStorage.removeItem("userId");
    // localStorage.removeItem("sportId");
    // localStorage.removeItem("genderId");
    // localStorage.removeItem("clubId");
  }

  goToLogin(): void {
    this.router.navigateByUrl("/login");
  }
}
