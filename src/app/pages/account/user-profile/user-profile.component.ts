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

interface CountryDataResponse {
  data: {
    label: string;
    // Other properties in the response
  };
  // Other properties in the response
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
    "college_logo",
  ];

  user: any;
  first_name: string;
  last_name: string;
  profile_image: string;
  role: string;
  roles: [];
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
        // console.log('res', res);
        this.user = res;
        //this.role = res?.types[0]?.name;
        this.roles = res?.types;
        this.sport = res?.sport?.sport_name;
        this.club = res?.club?.club_name;
        this.transformData(this.user.profile_fields);
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  async transformData(profileFields) {
    this.profileData = await Promise.all(
      profileFields
        .filter(
          (item) =>
            !this.filteredNames.includes(item?.field?.name) &&
            item.value !== null &&
            typeof item.value === "string" &&
            item.value.trim() !== ""
        )
        .map(async (item) => {
          if (item?.field) {
            const { name, label } = item.field;
            let value = item.value;

            if (name === "profile_image") {
              value = this.env.imageUrl + value;
              this.profile_image = value;
            }
            if (name === "first_name") {
              this.first_name = value;
            }
            if (name === "last_name") {
              this.last_name = value;
            }
            if (name === "mobile_phone") {              
              value = this.formateMobile(value);
            }
            if (name === "country") {
              const res = (await this.service.getCountryData(value)) as {
                data: { label: string };
              };
              value = res.data?.label;
            }

            if (name === "state") {
              const res = (await this.service.getStateData(value)) as {
                data: { label: string };
              };
              value = res.data?.label;
            }

            return { name, label, value };
          }
        })
    );
  }

  formateMobile(e: any) {
    let s = "";
    e = e.slice(-10);
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      s = "(" + first + ") " + mid + "-" + last;
      return s;
    }
  }

}
