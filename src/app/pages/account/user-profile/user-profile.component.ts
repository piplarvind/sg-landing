import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";

import { SharedService } from "@app/shared/shared.service";
import { ChangePasswordProcessService } from "@app/auth/onboarding/changePassword.process.service";
import { AccountService } from "../account.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  showCameraIcon = false;

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  profileForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public _DomSanitizationService: DomSanitizer,
    public sharedService: SharedService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    //create vendor form
    this.profileForm = this.fb.group({
      phone_number: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  browseImage() {
    // Trigger the file input click event
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    // Handle the selected file here
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);
    // Add your logic to handle the selected file, e.g., upload to server
  }

  onSubmit() {
    if(this.profileForm.valid) {

    }
  }
}
