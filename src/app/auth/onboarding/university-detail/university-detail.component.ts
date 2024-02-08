import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { UniversityProcessService } from "../university.process.service";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";
import { MatSort } from "@angular/material/sort";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";


@Component({
  selector: "app-university-detail",
  templateUrl: "./university-detail.component.html",
  styleUrls: ["./university-detail.component.scss"],
})
export class UniversityDetailComponent implements OnInit {

  activePanelIndex = 0;
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

  nextButtonClicked = false;
  universityForm = this.universityProcessService.universityForm;
  color: ThemePalette = "accent";
  checked = false;
  disabled = false;
  initialCountry: string = "us";
  phone_code: string = "1";
  mobile_phone: any = "";

  constructor(
    private router: Router,
    private universityProcessService: UniversityProcessService,
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
    this.mobile_phone = numberWithoutDialCode;
  }

  hasTelError(event: any) {
    //console.log('event', event);
  }

  formatMobile(event: any) {
    if (event) {
      let new_value = event.replace(/\D/g, "");
      new_value = new_value.slice(-10);
      if (new_value.length <= 10 && new_value) {
        this.mobile_phone = this.inputChanged(new_value);
      }
      if (new_value.length === 0) {
        this.mobile_phone = "";
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

    if (this.universityForm.valid) {
      const universityData = this.universityForm.value;
      const convertedData = this.convertData(universityData);
      
      //console.log('convertedData',convertedData);return;
      this.onboardingService.saveUniversityData(convertedData).subscribe(
        (response) => {
          //this.sharedService.showMessage(response.message);
          if (response.status === "Success") {
            localStorage.setItem("userId", response.data._id);
            localStorage.setItem("phone_code", response.data.phone_code);
            localStorage.setItem("mobile_phone", response.data.mobile_phone);
            localStorage.setItem("otp", response.data.otp);
            this.router.navigate(["/otp"]);
          }
        },
        (error) => {
          if (error.status === 409) {
            localStorage.setItem("userId", error.error.data._id);
            const completedSteps = error.error.data[0]?.completed_steps || 1;
            this.router.navigate([`/auth/onboarding/step${completedSteps}`]);
          } else {
            this.router.navigate(["/auth/onboarding/university-detail"]);
          }
        }
      );
    } else {
      //this.sharedService.showMessage("Please fill required fields");
    }
  }

  convertData(inputData: any) {
    const profileFieldsData = [
      { field: "recruiter_title", value: inputData.recruiter_title },
      { field: "official_email", value: inputData.official_email },
      { field: "program_website_url", value: inputData.program_website_url },
      { field: "university_name", value: inputData.university_name },
      { field: "phone_code", value: this.phone_code },
      { field: "mobile_phone", value: this.plainMobileNumber(this.mobile_phone) },
      { field: "street_address", value: inputData.street_address },
      { field: "city", value: inputData.city },
      { field: "state", value: inputData.state },
      { field: "zip", value: inputData.zip },
    ];

    localStorage.setItem("phone_code", inputData.phone_code);
    localStorage.setItem("mobile_phone", inputData.mobile_phone);

    return {
      profile_fields_data: profileFieldsData,
      profile_id: localStorage.getItem("userId"),
    };
  }
}
