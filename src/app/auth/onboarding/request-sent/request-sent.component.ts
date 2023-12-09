import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-request-sent",
  templateUrl: "./request-sent.component.html",
  styleUrls: ["./request-sent.component.scss"],
})
export class RequestSentComponent implements OnInit {
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
