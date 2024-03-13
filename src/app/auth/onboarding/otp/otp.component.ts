import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { OTPProcessService } from "../otp.process.service";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.scss"],
})
export class OTPComponent implements OnInit {
  nextButtonClicked = false;
  otpForm = this.otpProcessService.otpForm;
  otp: any;
  country_code: any;
  phone_number:any;
  user_email:any;
  profile_id:any;
  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  constructor(
    private router: Router,
    private otpProcessService: OTPProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.otp = localStorage.getItem('otp');
    this.country_code = localStorage.getItem('phone_code');
    this.phone_number = localStorage.getItem('mobile_phone');
    this.user_email = localStorage.getItem('user_email');
    this.profile_id = localStorage.getItem('userId');
    //console.log('profile_id', this.phone_number);
    // this.otpForm.addControl('profile_id', this.profile_id);
    // this.otpForm.addControl('country_code', this.country_code);
    // this.otpForm.addControl('phone_number', this.phone_number);
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.otpProcessService.otpForm.valid) {
      const otpData = this.otpProcessService.otpForm.value;
      otpData.phone_code = localStorage.getItem("phone_code");
      otpData.phone_number = localStorage.getItem("mobile_phone");
      //this.otp = localStorage.getItem("otp");
      this.onboardingService.verifyOTPData(otpData).subscribe(
        (response) => {
          //console.log("University data saved successfully:", response);
          this.sharedService.showMessage(response.message);
          // Navigate to the next step
          if (response?.status === "Success") {
            this.router.navigate(["/auth/onboarding/success-screen"]);
          }
        },
        (error) => {
          //console.error("Error saving data:", error);
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
              this.sharedService.showMessage(error.error.message);
              this.router.navigate(["/auth/onboarding/otp"]);
            }
          } else {
            //console.error("User already exist:", error);
            this.sharedService.showMessage(error.error.message);
            this.router.navigate(["/auth/onboarding/otp"]);
          }
        }
      );

      // this.router.navigate(["/auth/onboarding/step2"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields.");
      this.sharedService.showMessage("Plase enter OTP");
    }
  }

  resndOTP() {
    const otpData = this.otpProcessService.otpForm.value;
    otpData.profile_id = localStorage.getItem("userId");
    otpData.phone_code = localStorage.getItem("phone_code");
    otpData.phone_number = localStorage.getItem("mobile_phone");
    this.onboardingService.resendOTPData(otpData).subscribe(
      (response) => {
        this.sharedService.showMessage(response.message);
        if (response?.status === "Success") {
          this.otp = response?.data[0]?.otp;
          this.router.navigate(["/auth/onboarding/otp"]);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/university-detail"]);
        }
        this.sharedService.showMessage(error.error.message);
        this.router.navigate(["/auth/onboarding/otp"]);
      }
    );
  }
}
