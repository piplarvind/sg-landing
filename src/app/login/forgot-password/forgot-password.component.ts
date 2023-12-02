import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { LoginService } from "@app/login/login.service";
import { SharedService } from "@app/shared/shared.service";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "environments/environment";
import { AuthenticationService } from "@app/core";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  fpForm: UntypedFormGroup;
  error: string;
  isLoading = false;
  hide = true;
  newPassword: any;
  reNewPassword: any;
  invalidUsername = false;
  reqObj: any;
  passwordMismatch: Boolean;
  activeRouteSubscriber: any;
  userId: any;
  req: any;
  pathurl: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    public sharedService: SharedService,
    public activateRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    //  this.req=false;
    this.activeRouteSubscriber = this.activateRoute.queryParams.subscribe(
      (param) => {
        this.userId = param.user;
        this.getPath();
      }
    );
  }

  private createForm() {
    this.fpForm = this.formBuilder.group({
      username: ["", Validators.required]
    });
  }

  getPath() {
    let path = window.location.href;
    this.pathurl = path.split("?");
  }

  validateUsername(value: any) {
    if (value.search(/^[0-9]{10}$/) === 0) {
      this.invalidUsername = false;
    } else {
      this.invalidUsername = true;
    }
  }

  submitForgotPassword() {
    this.authenticationService
      .forgotPassword(this.fpForm.value)
      .then((res: any) => {
        this.sharedService.showMessage(res.message);
        this.router.navigateByUrl("/login");
      })
      .catch((err: any) => {
        //console.log(err);
        // this.sharedService.showMessage("Something went wrong, please try again");
        this.sharedService.showMessage(err?.error?.message || "Something went wrong, please try again");
        this.router.navigateByUrl("/forgot-password");
      });
  }

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
    if (this.newPassword !== this.reNewPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }
}
