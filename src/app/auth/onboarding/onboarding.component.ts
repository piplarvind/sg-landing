import { Component, OnDestroy } from "@angular/core";
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DataService } from "@app/core/data.service";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"],
})
export class OnboardingComponent implements OnDestroy {
  roleType: string;
  private dataSubscription: Subscription;

  constructor(private dataService: DataService) {
    this.dataSubscription = this.dataService.getData().subscribe((data) => {
      this.roleType = data;
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
