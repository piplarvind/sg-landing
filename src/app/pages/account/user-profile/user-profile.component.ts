import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { environment } from "@env/environment";
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
  providers: [ProfileService],
})
export class UserProfileComponent implements OnInit {
  showCameraIcon = false;

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  env: any = environment;

  profileData: ProfileInfo[] = [];
  filteredNames: string[] = [
    "sweat_pants",
    "sweat_jacket",
    "jersey",
    "position",
    "age",
    "gender",
    "college_logo"
  ];

  user: any;
  first_name: string;
  last_name: string;
  profile_image: string;
  role: string;
  sport: string;
  club: string;

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
  }

  getMyProfile(userId) {
    this.service
      .getProfile(userId)
      .then((e: any) => {
        const res = e.data;
        this.user = res;
        this.role = res?.types[0]?.name;
        this.sport = res?.sport?.sport_name;
        this.club = res?.club?.club_name;
        this.transformData(this.user.profile_fields);
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  transformData(profileFields): void {
    this.profileData = profileFields
      .filter(
        (item) =>
          !this.filteredNames.includes(item.field.name) &&
          item.value !== null && // Check for null values
          typeof item.value === "string" && // Check if the value is a string
          item.value.trim() !== "" // Check if the trimmed value is not an empty string
      )
      .map((item) => {
        const { name, label } = item.field;
        let value = item.value;
        // Special handling for the 'profile_image' field
        if (name === 'profile_image') {
          value = this.env.imageUrl + value;
          this.profile_image = value;
        }
        if (name === 'first_name') {
          this.first_name = value;
        }
        if (name === 'last_name') {
          this.last_name = value;
        }
        return { name, label, value };
      });
    console.log("this.profileData", this.profileData);
  }
}
