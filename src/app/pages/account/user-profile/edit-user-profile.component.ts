import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { SharedService } from "@app/shared/shared.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "./profile.service";

// profile.interface.ts
export interface ProfileInfo {
  name: string;
  value: any;
}


@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  providers: [ProfileService]
})
export class EditUserProfileComponent implements OnInit {
  showCameraIcon = false;

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  profileForm: FormGroup;
  
  
  user: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public _DomSanitizationService: DomSanitizer,
    public sharedService: SharedService,
    private service: ProfileService
  ) {}

  ngOnInit() {
    let userId = localStorage.user_id;
    this.getMyProfile(userId);
    //create vendor form
    this.profileForm = this.fb.group({
      phone_number: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  getMyProfile(userId) {
    this.service
      .getProfile(userId)
      .then((e: any) => {
        const res = e.data;
        this.user = res;
        console.log(this.user);
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
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
