import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";

import { SharedService } from "@app/shared/shared.service";
import { ChangePasswordProcessService } from "@app/auth/onboarding/changePassword.process.service";
import { AccountService } from "../account.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  changePasswordForm = this.changePasswordProcessService.changePasswordForm;

  constructor(
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private changePasswordProcessService: ChangePasswordProcessService,
    public sharedService: SharedService,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  togglePasswordVisibility(controlName: string): void {
    if (controlName === 'old_password') {
      this.showOldPassword = !this.showOldPassword;
    } else if (controlName === 'new_password') {
      this.showNewPassword = !this.showNewPassword;
    } else if (controlName === 'confirm_password') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    if (this.changePasswordProcessService.changePasswordForm.valid) {
      const passwordFormData =
        this.changePasswordProcessService.changePasswordForm.value;

      if (passwordFormData.new_password !== passwordFormData.confirm_password) {
        this.sharedService.showMessage(
          "New password and confirm password don't match"
        );
      } else {
        this.accountService
          .changePassword(passwordFormData)
          .then((res: any) => {
            this.sharedService.showMessage(res.message);
          })
          .catch((err) => {
            console.log(err);
            this.sharedService.showMessage(err.message);
          });
      }
    } else {
      this.sharedService.showMessage("Please fill all required fields");
    }
  }
}
