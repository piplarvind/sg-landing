import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appStepLabel]',
})
export class StepLabelDirective {
  @Input('appStepLabel') routerPath!: string;

  constructor(public templateRef: TemplateRef<void>) {}
}
