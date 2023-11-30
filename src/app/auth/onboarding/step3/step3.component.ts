import { Component, OnInit } from "@angular/core";
import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// component
import { OnboardingService } from "../onboarding.service";
import { DataService } from "@app/core/data.service";

@Component({
  selector: "app-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.scss"],
})
export class Step3Component implements OnInit {
  nextButtonClicked = false;

  roles: any = [];
  genders: any = [];
  selectedrole: string = "";
  
  private roleSubscription: Subscription;

  step3Form = this.onboardingProcessService.step3Form;

  constructor(
    private router: Router,
    private dataService: DataService,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.getGenders();
    this.selectedrole = localStorage.getItem("userType");
    // Subscribe to changes in the 'role' control
    this.roleSubscription = this.step3Form.get('role')?.valueChanges.subscribe((role) => {
      // Update the step3Form based on the selected role
      // this.onboardingProcessService.updateStep3Form(role);
      this.onboardingProcessService.updateStep3Form(this.selectedrole);
    });
  }

  // ngOnDestroy() {
  //   // Unsubscribe to avoid memory leaks
  //   if (this.roleSubscription) {
  //     this.roleSubscription.unsubscribe();
  //   }
  // }

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

  onRoleChange(event: any, role: any): void {
    // const selectedRoleValue = role._id;
    const selectedRoleAbbr = role.abbr;
    this.selectedrole = role.abbr;
    localStorage.setItem("userType", selectedRoleAbbr);
    this.dataService.setData(this.selectedrole);
    // Do whatever you need with the selected value
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
