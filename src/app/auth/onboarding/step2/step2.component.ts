import { Component, OnInit } from "@angular/core";
import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// component
import { OnboardingService } from "../onboarding.service";
import { DataService } from "@app/core/data.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.scss"],
})
export class Step2Component implements OnInit {
  nextButtonClicked = false;

  roles: any = [];
  genders: any = [];
  selectedrole: string = "";
  
  private roleSubscription: Subscription;

  step2Form = this.onboardingProcessService.step2Form;

  constructor(
    private router: Router,
    private dataService: DataService,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.getGenders();
    this.selectedrole = localStorage.getItem("userType");
    // Subscribe to changes in the 'role' control
    this.roleSubscription = this.step2Form.get('role')?.valueChanges.subscribe((role) => {
      // Update the step2Form based on the selected role
      // this.onboardingProcessService.updateStep2Form(role);
      this.onboardingProcessService.updateStep2Form(this.selectedrole);
    });
  }

  getRoles() {
    this.onboardingService.getRoles().subscribe(
      (response) => {
        this.roles = response.data;
        console.log("roles data:", response);
      },
      (error) => {
        //console.error("Error getting roles data:", error);
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  getGenders() {
    this.onboardingService.getGenders().subscribe(
      (response) => {
        this.genders = response.data;
        console.log("gender data:", response.data);
      },
      (error) => {
        //console.error("Error getting gender data:", error);
        this.sharedService.showMessage(error.error.message);
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
    if (this.onboardingProcessService.step2Form.valid) {
      const roleFormData = this.onboardingProcessService.step2Form.value;
      // set gender to local storage
      localStorage.setItem("genderId", roleFormData.gender);
      let roleData = {
        profile_id: localStorage.getItem("userId"),
        roles: [roleFormData.role],
      };
      this.onboardingService.saveRoleData(roleData).subscribe(
        (response) => {
          //console.log("Role data saved successfully:", response.data);
          this.sharedService.showMessage(response.message);
          // Navigate to the next step
          this.router.navigate(["/auth/onboarding/step3"]);
        },
        (error) => {
          //console.error("Error saving role data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/step1"]);
        }
      );
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields in Step 3.");
      this.sharedService.showMessage("Please fill all required fields");
    }
  }
}
