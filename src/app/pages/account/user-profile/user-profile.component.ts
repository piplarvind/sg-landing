import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { environment } from "@env/environment";
import { SharedService } from "@app/shared/shared.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "./profile.service";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { AccountService } from "../account.service";

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
  isLoading = false;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  env: any = environment;

  collage_name: string = "";
  initialCountry: string = "US";
  country: string = "";
  state: string = "";
  city: string = "";
  street_address: string = "";
  zip: string = "";
  phone_code: string = "US";
  mobile_phone: any = "";
  signed_senior: boolean = false;
  clgarr: any = [];
  GenderList: any = [];
  gender: string;
  ath_gender: string;
  selectedAthletePosition: any = [];
  position: string;
  home: any = "";
  handedList: any;
  uniforSizeList: any;
  StatusList: any = [];
  status: any;
  invalidNumber: boolean;
  type: any;
  length: any;
  marked = false;
  approach_touch: any;
  username: any;
  height_inch: any;
  height_feets: any;
  ParentName: any = [];
  reach_inch: any;
  reach_feets: any;
  approch_inch: any;
  approch_feets: any;
  editAthleteId: any;
  createfield: any = [];
  check: boolean;
  college_image: any = "";
  college_img: any = "";
  positionList: any = [];
  school_img: any = "";
  countryList: any = [];
  districtList: any;
  ageList: any;
  stateList: any = [];
  logo: any = "";
  school_image_logo: any = "";
  regionsList: Array<any> = [];
  profile_image: any = "assets/user-192x192.png";
  ath_profile_image: any = "assets/user-192x192.png";
  tempFile: any;
  finalData: any = [];
  name: any = [];
  isChecked: boolean = false;
  activeRouteSubscriber: any;
  fields: any = [];

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
  ath_first_name: string;
  last_name: string;
  ath_last_name: string;
  email: string;
  age: string;
  ath_age: string;
  role: string;
  roles: [];
  sport: string;
  sport_logo: string = "";
  club_logo: string = "";
  ath_sport: string;
  club: string;
  ath_club: string;
  ath_team: string;
  grad_year: string;
  school_name: string;
  gpa: string;
  act_score: string;
  sat_math_score: string;
  sat_verbal_score: string;
  college_name: string;
  jersey_no: string;
  handed: string;
  captain: string;
  approach: string;
  reach: string;
  honors: string;
  usav_no: string;
  aau_no: string;
  fan_of: string;
  club_title: string;
  recruiter_title: string;
  official_email: string;
  program_website_url: string;
  university_name: string;

  jersey: string;
  shorts: string;
  sweat_jacket: string;
  sweat_pants: string;
  spandex: string;

  ath_data: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public _DomSanitizationService: DomSanitizer,
    public sharedService: SharedService,
    private service: ProfileService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    let userId = localStorage.user_id;
    this.role = localStorage.user_role;
    this.getMyProfile(userId);
    if (this.role === "PAR") {
      this.fetchMyAthletes();
    }
  }

  getMyProfile(userId: any) {
    this.sharedService.showLoader = true;
    this.isLoading = true;
    this.service
      .getProfile(userId)
      .then(async (e: any) => {
        this.isLoading = false;
        this.sharedService.showLoader = false;
        const res = e.data;
        // console.log('res', res);
        this.user = res;

        for (let i = 0; i < res?.profile_fields.length; i++) {
          if (res?.profile_fields[i].field) {
            if (res?.profile_fields[i].field.name === "first_name") {
              this.first_name = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "last_name") {
              this.last_name = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "user_name") {
              this.username = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "email") {
              this.email = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "phone_code") {
              this.phone_code = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "phone_code") {
              const iso2: CountryCode = res.profile_fields[i].value
                ? res.profile_fields[i].value
                : "US";
              this.phone_code = getCountryCallingCode(iso2);
            }
            if (res?.profile_fields[i].field.name === "mobile_phone") {
              this.mobile_phone = this.formateMobile(
                res?.profile_fields[i].value
              );
            }
            if (res?.profile_fields[i].field.name === "age") {
              this.age = res?.profile_fields[i].value?.display_value;
            }
            if (res?.profile_fields[i].field.name === "gender") {
              this.gender = res?.profile_fields[i].value?.display_value;
            }
            if (res?.profile_fields[i].field.name === "position") {
              this.position = res?.profile_fields[i].value?.display_value;
            }

            if (res?.profile_fields[i].field.name === "country") {
              const country_id = res?.profile_fields[i].value;
              if (country_id) {
                const country = (await this.service.getCountryData(
                  country_id
                )) as {
                  data: { label: string };
                };
                this.country = country.data?.label;
              }
            }

            if (res?.profile_fields[i].field.name === "state") {
              const state_id = res?.profile_fields[i].value;
              if (state_id) {
                const state = (await this.service.getStateData(state_id)) as {
                  data: { label: string };
                };
                this.state = state.data?.label;
              }
            }

            if (res?.profile_fields[i].field.name === "street_address") {
              this.street_address = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "city") {
              this.city = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "zip") {
              this.zip = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "jersey_no") {
              this.jersey_no = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "handed") {
              const handed_id = res?.profile_fields[i].value;
              if (handed_id) {
                const handed = (await this.service.getHandedData(
                  handed_id
                )) as {
                  data: { label: string };
                };
                this.handed = handed.data?.label;
              }
            }

            if (res?.profile_fields[i].field.name === "captain") {
              this.captain = res?.profile_fields[i].value ? "Yes" : "No";
            }

            if (res?.profile_fields[i].field.name === "approach_touch") {
              let a = res?.profile_fields[i].value.split(":");
              this.approach = a[0] + "' " + a[1] + '"';
            }

            if (res?.profile_fields[i].field.name === "reach") {
              let a = res?.profile_fields[i].value.split(":");
              this.reach = a[0] + "' " + a[1] + '"';
            }

            if (res?.profile_fields[i].field.name === "honors") {
              this.honors = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "usav_no") {
              this.usav_no = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "aau_no") {
              this.aau_no = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "jersey") {
              const jersey_id = res?.profile_fields[i].value;
              if (jersey_id) {
                const jersey = (await this.service.getUniformSizeData(
                  jersey_id
                )) as {
                  data: { uniform_size: string };
                };
                this.jersey = jersey.data?.uniform_size;
              }
            }

            if (res?.profile_fields[i].field.name === "shorts") {
              const shorts_id = res?.profile_fields[i].value;
              if (shorts_id) {
                const shorts = (await this.service.getUniformSizeData(
                  shorts_id
                )) as {
                  data: { uniform_size: string };
                };
                this.shorts = shorts.data?.uniform_size;
              }
            }

            if (res?.profile_fields[i].field.name === "sweat_jacket") {
              const sweat_jacket_id = res?.profile_fields[i].value;
              if (sweat_jacket_id) {
                const sweat_jacket = (await this.service.getUniformSizeData(
                  sweat_jacket_id
                )) as {
                  data: { uniform_size: string };
                };
                this.sweat_jacket = sweat_jacket.data?.uniform_size;
              }
            }

            if (res?.profile_fields[i].field.name === "sweat_pants") {
              const sweat_pants_id = res?.profile_fields[i].value;
              if (sweat_pants_id) {
                const sweat_pants = (await this.service.getUniformSizeData(
                  sweat_pants_id
                )) as {
                  data: { uniform_size: string };
                };
                this.sweat_pants = sweat_pants.data?.uniform_size;
              }
            }

            if (res?.profile_fields[i].field.name === "spandex") {
              const spandex_id = res?.profile_fields[i].value;
              if (spandex_id) {
                const spandex = (await this.service.getUniformSizeData(
                  spandex_id
                )) as {
                  data: { uniform_size: string };
                };
                this.spandex = spandex.data?.uniform_size;
              }
            }

            if (res?.profile_fields[i].field.name === "grad_year") {
              this.grad_year = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "school_name") {
              this.school_name = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "gpa") {
              this.gpa = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "act_score") {
              this.act_score = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "sat_math_score") {
              this.sat_math_score = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "sat_verbal_score") {
              this.sat_verbal_score = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "profile_image") {
              this.profile_image = `${res?.profile_fields[i].value}`
                ? `${environment.imageUrl}${res?.profile_fields[i].value}`
                : "assets/user-192x192.png";
            }
            if (res?.profile_fields[i].field.name === "school_logo") {
              this.school_img = `${environment.imageUrl}${res?.profile_fields[i].value}`;
            }

            if (res?.profile_fields[i].field.name === "status") {
              if (res?.profile_fields[i].value) {
                this.statusData(res?.profile_fields[i].value);
              }
            }
            if (res?.profile_fields[i].field.name === "college_name") {
              this.college_name = res?.profile_fields[i].value;
            }

            if (res?.profile_fields[i].field.name === "college_logo") {
              this.college_img = `${environment.imageUrl}${res?.profile_fields[i].value}`;
            }

            if (res?.profile_fields[i].field.name === "height") {
              let a = res?.profile_fields[i].value.split(":");
              this.height_feets = a[0];
              this.height_inch = a[1];
            }

            //recruiter
            if (res?.profile_fields[i].field.name === "recruiter_title") {
              this.recruiter_title = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "official_email") {
              this.official_email = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "program_website_url") {
              this.program_website_url = res?.profile_fields[i].value;
            }
            if (res?.profile_fields[i].field.name === "university_name") {
              this.university_name = res?.profile_fields[i].value;
            }
          }
        }

        //this.role = res?.types[0]?.name;
        this.roles = res?.types;
        this.sport = res?.sport?.sport_name;
        this.sport_logo = `${environment.imageUrl}${res?.sport?.sg_sport_logo}`;
        this.club = res?.club?.club_name;
        this.club_logo = `${environment.imageUrl}${res?.club?.logo}`;
      })
      .catch((err) => {
        //console.log(err);
        this.isLoading = false;
        this.sharedService.showLoader = false;
      });
  }

  fetchMyAthletes() {
    let userId = localStorage.user_id;
    this.accountService
      .getParentAthletes(userId)
      .then((e: any) => {
        const res = e.data;
        this.ath_data = res?.child
          ?.filter((prof: any) => prof?.accepted === 'accepted')
          .map((prof:any) => {
            const prop = prof?.profile_id;
            let name: any = {
                fname: "",
                lname: "",
              },
              ath_sport: string = prop?.sport?.sport_name,
              ath_club: string = prop?.club?.club_name,
              ath_team: string = prop?.teams[0]?.name,
              ath_profile_image:string = "",
              ath_age: string = "",
              ath_gender: string = "",
              ath_position: string = "",
              email: string = "",
              phone_code: any = "",
              mobile_phone: any = "",
              accepted: any = "";
            accepted = prof.accepted;



            for (let i = 0; i < prop?.profile_fields.length; i++) {
              if (prop?.profile_fields[i].field) {
                if (prop?.profile_fields[i].field.name === "first_name") {
                  name.fname = prop?.profile_fields[i].value;
                }
                if (prop?.profile_fields[i].field.name === "last_name") {
                  name.lname = prop?.profile_fields[i].value;
                }
                
                if (prop?.profile_fields[i].field.name === "profile_image") {
                  ath_profile_image = `${prop?.profile_fields[i].value}`
                    ? `${environment.imageUrl}${prop?.profile_fields[i].value}`
                    : "assets/user-192x192.png";
                }
                if (prop?.profile_fields[i].field.name === "age") {
                  ath_age = prop?.profile_fields[i].value?.display_value;
                }
                if (prop?.profile_fields[i].field.name === "gender") {
                  ath_gender = prop?.profile_fields[i].value?.display_value;
                }
                if (prop?.profile_fields[i].field.name === "position") {
                  ath_position = prop?.profile_fields[i].value?.display_value;
                }
              }
            }
            return {
              ...prop, 
              ath_sport: ath_sport,
              ath_club: ath_club,
              ath_team: ath_team,
              name: name.fname + " " + name.lname,
              ath_profile_image: ath_profile_image,
              ath_age: ath_age,
              ath_gender: ath_gender,  
              ath_position: ath_position,        
              accepted: accepted,
              accepted_at: prof.accepted_at,
            };
          });

        // Sort the array by the "accepted" field
        this.ath_data.sort((a, b) => (a.accepted > b.accepted ? 1 : -1));
        console.log('ath_data', this.ath_data);
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  statusData(status_id: any) {
    this.service.getStatusData(status_id).then((res: any) => {
      this.status = res.data;
    });
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
