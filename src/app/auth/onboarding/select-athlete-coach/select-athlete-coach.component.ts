import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { SharedService } from "@app/shared/shared.service";
import { DomSanitizer } from "@angular/platform-browser";

//
import { SubscriptionService } from "@app/pages/account/subscription/subscription.service";
import { OnboardingProcessService } from "../onboarding.process.service";
import { OnboardingService } from "./../onboarding.service";

@Component({
  selector: "app-select-athlete-coach",
  templateUrl: "./select-athlete-coach.component.html",
  styleUrls: ["./select-athlete-coach.component.scss"],
})
export class SelectAthleteCoachComponent {
  searchText: string = "";
  athleteForm: FormGroup;
  filteredAthleteList: any[] = [];

  nextButtonClicked = false;

  athleteList: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public _DomSanitizationService: DomSanitizer,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.initForm();
    let clubPayload = {
      club: localStorage.getItem("clubId"),
    };
    this.onboardingService.getClubAthletes(clubPayload).subscribe(
      (response) => {
        this.athleteList = response.data;
        console.log("athleteList", this.athleteList);
      },
      (error) => {
        //console.error("Error saving club data:", error);
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  initForm(): void {
    this.athleteForm = this.fb.group({
      selectedAthletes: this.fb.array([], [Validators.required]),
    });
  
    // Initialize form controls dynamically based on athlete IDs
    this.filteredAthleteList.forEach((athlete) => {
      this.addAthleteControl(athlete._id);
    });
  }
  
  addAthleteControl(athleteId: string): void {
    const formArray = this.athleteForm?.get('selectedAthletes') as FormArray;
    formArray.push(this.fb.control({ value: false, athleteId }, Validators.required));
  }

  getAthleteControl(athleteId: string): FormControl {
    return (this.athleteForm?.get('selectedAthletes') as FormArray).controls.find(
      (control) => control.value === athleteId
    ) as FormControl;
  }

  onSportOptionClick(athleteId: string): void {
    const control = this.getAthleteControl(athleteId);
    if (control) {
      control.setValue(!control.value);
    }
  }

  onSubmit() {
    if (this.athleteForm.valid) {
      const athFormData = this.athleteForm.value;
      let payloadData = {
        profile_id: localStorage.getItem("userId"),
        child: [athFormData.athlete],
      };
      console.log("payloadData", payloadData);
      this.onboardingService.saveParentAthletes(payloadData).subscribe(
        (response) => {
          //console.log("Role data saved successfully:", response.data);
          this.sharedService.showMessage(response.message);
          // Navigate to the next step
          this.router.navigate(["/auth/onboarding/request-sent"]);
        },
        (error) => {
          //console.error("Error saving role data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/select-athletes"]);
        }
      );
      // this.router.navigate([
      //   "auth/onboarding/do-payment/" + athFormData.plan,
      // ]);
    } else {
      this.sharedService.showMessage("Please select athlete");
    }
  }
}
