import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { ClubnothereProcessService } from "../clubnothere.process.service";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";
import { MatSort } from "@angular/material/sort";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";

@Component({
  selector: "app-club-not-here",
  templateUrl: "./club-not-here.component.html",
  styleUrls: ["./club-not-here.component.scss"],
})
export class ClubNotHereComponent implements OnInit {
  nextButtonClicked = false;
  clubForm = this.clubnothereProcessService.clubForm;
  genders: any;

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.India,
    CountryISO.UnitedKingdom,
  ];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("ng2TelInput", { static: true }) ng2TelInput: ElementRef<HTMLInputElement>;


  initialCountry: string = "us";
  phone_code: string = "1";
  mobile_no: any = "";

  constructor(
    private router: Router,
    private clubnothereProcessService: ClubnothereProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {}

  
  telCountryChange(country: any) {
    this.phone_code = country.dialCode;
  }

  getNumber(e: any) {
    const dialCode = this.phone_code;
    const numberWithoutDialCode = e.startsWith(dialCode)
      ? e.slice(dialCode.length)
      : e;
    this.mobile_no = numberWithoutDialCode;
  }

  hasTelError(event: any) {
    //console.log('event', event);
  }

  formatMobile(event: any) {
    if (event) {
      let new_value = event.replace(/\D/g, "");
      new_value = new_value.slice(-10);
      if (new_value.length <= 10 && new_value) {
        this.mobile_no = this.inputChanged(new_value);
      }
      if (new_value.length === 0) {
        this.mobile_no = "";
      }
    }
  }

  inputChanged(e: any) {
    let s = "";
    e = e.slice(-10);
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      s = "(" + first + ") " + mid + "-" + last;
      return s;
    }
    return "";
  }

  plainMobileNumber(e: any) {
    let s = "";
    e = e.slice(-10);
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      s = first + mid + last; // Remove parentheses and hyphen
      return s;
    }
    return "";
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.clubnothereProcessService.clubForm.valid) {
      let clubData = this.clubnothereProcessService.clubForm.value;
      clubData.phone_code = this.phone_code;
      clubData.mobile_no = this.plainMobileNumber(this.mobile_no);
      clubData.profile_id = localStorage.getItem("userId");
      
      this.onboardingService.saveClubNotHereData(clubData).subscribe(
        (response) => {
          localStorage.setItem("userId", response?.data?._id);
          // Navigate to the next step
          if (response?.status === "Success") {
            this.router.navigate(["/score-screen"]);
          }
        },
        (error) => {
          //console.error("Error saving user data:", error);
          if (error.status === 409) {
            localStorage.setItem("userId", error?.error?.data[0]?._id);
            if (error?.error?.data[0]?.completed_steps === 1) {
              this.router.navigate(["/auth/onboarding/step2"]);
            } else if (error?.error?.data[0]?.completed_steps === 2) {
              this.router.navigate(["/auth/onboarding/step3"]);
            } else if (error?.error?.data[0]?.completed_steps === 3) {
              this.router.navigate(["/auth/onboarding/step4"]);
            } else if (error?.error?.data[0]?.completed_steps === 4) {
              this.router.navigate(["/auth/onboarding/step5"]);
            } else {
              //console.error("User already exist:", error);
              this.router.navigate(["/auth/onboarding/step1"]);
            }
          } else {
            //console.error("User already exist:", error);
            this.sharedService.showMessage("Please fill all required fields");
            this.router.navigate(["/auth/onboarding/step1"]);
          }
        }
      );
    } else {
      // If the form is invalid, show an error or handle it accordingly
      this.sharedService.showMessage("Please fill all required fields");
    }
  }
}
