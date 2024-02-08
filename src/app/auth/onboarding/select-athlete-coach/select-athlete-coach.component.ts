import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
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
  athleteCoachForm: FormGroup;
  athleteList: any[] = [];
  

  nextButtonClicked = false;

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
    this.onboardingService.getAthleteCoaches(clubPayload).subscribe(
      (response) => {
        //this.athleteList = response.data;
        const newres = response.data.map((prop) => {
          let fname = "",
            lname = "",
            user_name = "",
            email = "",
            phone_code = "",
            moblino: "",
            types: any = [];

          for (let i = 0; i < prop.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === "first_name") {
                fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "last_name") {
                lname = prop.profile_fields[i].value;
              }

              if (prop.profile_fields[i].field.name === "user_name") {
                user_name = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "email") {
                email = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "phone_code") {
                phone_code = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "mobile_phone") {
                moblino = prop.profile_fields[i].value;
              }
            }
          }

          for (let i = 0; i < prop.types.length; i++) {
            const ty = prop.types[i].name;
            types = types.concat(ty);
          }

          return {
            ...prop,
            first_name: fname,
            last_name: lname,
            type: types,
            user_name: user_name,
            phone_code: phone_code,
            phone: moblino,
            email: email,
            created_on: prop.created_on,
          };
        });

        this.athleteList = newres;
      },
      (error) => {
        //console.error("Error saving club data:", error);
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  get filteredAthleteList() {
    return this.athleteList.filter(
      (athlete: any) =>
        athlete.first_name
          .toLowerCase()
          .includes(this.searchText.toLowerCase().trim()) ||
        athlete.last_name
          .toLowerCase()
          .includes(this.searchText.toLowerCase().trim())
    );
  }
  

  initForm(): void {
    this.athleteCoachForm = this.fb.group({
      athlete: this.fb.array([], [Validators.required]), // Add validators as needed
    });
  
    // this.athleteCoachForm = this.fb.group({
    //   athlete: this.fb.array([]),
    // });
  }

  getAthleteControl(athleteId: string): AbstractControl {
    return (this.athleteCoachForm.get('athlete') as FormArray).controls.find(
      (control) => control.value === athleteId
    );
  }

  addSelectedAthlete(): void {
    // Implement your logic for adding athletes here
  }

  removeAthlete(athleteId: string): void {
    const index = (
      this.athleteCoachForm.get("athlete") as FormArray
    ).controls.findIndex((control) => control.value === athleteId);
    if (index !== -1) {
      (this.athleteCoachForm.get("athlete") as FormArray).removeAt(index);
    }
  }

  getAthleteNameById(athleteId: string): string {
    // Implement your logic to get athlete name by ID
    return ""; // Replace with actual implementation
  }

  onCheckboxChange(event: any, athleteId: string): void {
    const athleteControl = this.getAthleteControl(athleteId);
    if (event.checked && !athleteControl) {
      const newControl = this.fb.control(athleteId);
      (this.athleteCoachForm.get("athlete") as FormArray).push(newControl);
    } else if (!event.checked && athleteControl) {
      const index = (
        this.athleteCoachForm.get("athlete") as FormArray
      ).controls.indexOf(athleteControl);
      (this.athleteCoachForm.get("athlete") as FormArray).removeAt(index);
    }
  }

 

  

  onSubmit() {
    this.nextButtonClicked = true;
    if (this.athleteCoachForm.valid) {
      const athFormData = this.athleteCoachForm.value;
      let payloadData = {
        profile_id: localStorage.getItem("userId"),
        users: athFormData.athlete,
      };
      //console.log('payloadData', payloadData);return;
      this.onboardingService.saveAthleteCoaches(payloadData).subscribe(
        (response) => {
          //this.sharedService.showMessage(response.message);
          // Navigate to the next step
          //console.log('abc', response.data); return;
          this.router.navigate(["/auth/onboarding/select-subscription"]);
        },
        (error) => {
          //console.error("Error saving role data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/select-athlete-coach"]);
        }
      );
      // this.router.navigate([
      //   "auth/onboarding/do-payment/" + athFormData.plan,
      // ]);
    } else {
      //this.sharedService.showMessage("Please select athlete or coach");
    }
  }
}
