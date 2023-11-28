import { Component, OnInit } from "@angular/core";
import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { OnboardingService } from "../onboarding.service";
@Component({
  selector: "app-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.scss"],
})
export class Step3Component implements OnInit {
  nextButtonClicked = false;

  roles: any = [];
  genders: any = [];
  // roles = [
  //   { value: "ATH", label: "Athlete" },
  //   { value: "PAR", label: "Parent Of Athlete" },
  //   { value: "FFF", label: "Family, Friends & Fan" },
  //   { value: "COA", label: "Coach" },
  //   { value: "CAD", label: "Club Admin" },
  //   { value: "REC", label: "Recruiter" },
  // ];

  step3Form = this.onboardingProcessService.step3Form;

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.getGenders();
  }

  getRoles() {
    this.onboardingService.getRoles().subscribe(
      (response) => {
        console.log("roles data:", response);
        this.roles = response.data;
      },
      (error) => {
        console.error("Error getting roles data:", error);
      }
    );
  }

  getGenders() {
    this.onboardingService.getGenders().subscribe(
      (response) => {
        console.log("gender data:", response);
        this.genders = response.data;
      },
      (error) => {
        console.error("Error getting gender data:", error);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step3Form.valid) {
      const roleFormData = this.onboardingProcessService.step3Form.value;
      // set gender to local storage
      localStorage.setItem("genderId", roleFormData.gender);
      let roleData = {
        profile_id: localStorage.getItem("userId"),
        roles: [roleFormData.role],
      };
      this.onboardingService.saveRoleData(roleData).subscribe(
        (response) => {
          console.log("Role data saved successfully:", response.data);
          // Navigate to the next step
          this.router.navigate(["/auth/onboarding/step4"]);
        },
        (error) => {
          console.error("Error saving role data:", error);
          this.router.navigate(["/auth/onboarding/step3"]);
        }
      );
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 3.");
    }
  }
}
