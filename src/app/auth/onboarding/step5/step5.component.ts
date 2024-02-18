import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { OnboardingProcessService } from "../onboarding.process.service";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-step5",
  templateUrl: "./step5.component.html",
  styleUrls: ["./step5.component.scss"],
})
export class Step5Component implements OnInit {
  nextButtonClicked = false;
  subscriptionForm = this.onboardingProcessService.subscriptionForm;
  genders: any;

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    // this.getGenders();
  }

  togglePasswordVisibility(controlName: string): void {
    if (controlName === 'password') {
      this.showPassword = !this.showPassword;
    } else if (controlName === 'confirm_password') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  getGenders() {
    this.onboardingService.getGenders().subscribe(
      (response) => {
        //console.log("gender data:", response);
        this.sharedService.showMessage(response);
      },
      (error) => {
        //console.error("Error getting gender data:", error);
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.subscriptionForm.valid) {
      const subData = this.onboardingProcessService.subscriptionForm.value;

      this.onboardingService.saveStep1Data(subData).subscribe(
        (response) => {
          //console.log("User data saved successfully:", response);
          localStorage.setItem("userId", response?.data?._id);
          // Navigate to the next step
          this.router.navigateByUrl("/login");
        },
        (error) => {
          
          this.router.navigate(["/auth/onboarding/step5"]);
        }
      );
      // this.router.navigate(["/auth/onboarding/step2"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields in Step 1.");
      //this.sharedService.showMessage("Please fill all required fields");
    }
  }
}
