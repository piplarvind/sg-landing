// stepper.service.ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StepperService {
  private stepIndex: number = 0;

  getStepIndex(): number {
    return this.stepIndex;
  }

  setStepIndex(index: number): void {
    this.stepIndex = index;
  }
}
