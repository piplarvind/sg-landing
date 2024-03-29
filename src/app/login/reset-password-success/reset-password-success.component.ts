import { Component, OnInit } from "@angular/core";
import { LoginService } from "@app/login/login.service";
import { SharedService } from "@app/shared/shared.service";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "environments/environment";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-reset-password-success",
  templateUrl: "./reset-password-success.component.html",
  styleUrls: ["./reset-password-success.component.scss"],
})
export class ResetPasswordSuccessComponent implements OnInit {
  newPassword: string = "";
  reNewPassword: string = "";
  passwordMismatch: boolean = false;
  hide = true;
  reqObj: any;
  activeRouteSubscriber: any;
  token: any;
  req: any;
  pathurl: any;
  currentYear = new Date().getFullYear();
  constructor(
    private loginService: LoginService,
    public sharedService: SharedService,
    public activateRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.activeRouteSubscriber = this.activateRoute.params.subscribe(
      (params) => {
        this.token = params.token;
        this.getPath();
      }
    );
  }

  getPath() {
    let path = window.location.href;
    this.pathurl = path.split("?");
  }

  updatepassword() {
    this.reqObj = {
      newPassword: this.newPassword,
    };
    let token = this.token;
    this.loginService
      .changePassword(token, this.reqObj)
      .then((res: any) => {
        this.sharedService.showMessage(res.message);
        // if (this.pathurl[0] === `${environment.resetpasswordurl}`) {
        //   this.router.navigateByUrl('/login');
        // } else {
        //   this.router.navigateByUrl('/message');
        // }
        this.router.navigateByUrl("/reset-pass-success");
      })
      .catch((err: any) => {
        console.log(err);
        this.sharedService.showMessage(
          err?.error?.message || "Something went wrong, please try again"
        );
      });
  }
  // }

  errUpdate() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
  enter password and then click on submit.`
      )
      .subscribe((response) => {
        if (response === "") {
        }
      });
  }

  matchPassword() {
    this.passwordMismatch = this.newPassword !== this.reNewPassword;
  }
}
