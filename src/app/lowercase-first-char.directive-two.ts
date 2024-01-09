// lowercase-first-char.directive.ts
import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[appLowercaseFirstCharTwo]",
})
export class LowercaseFirstCharDirectiveTwo {
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event.target.value"])
  onInput(value: string) {
    this.el.nativeElement.value = this.capitalizeFirstChar(value);
  }

  private capitalizeFirstChar(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
}
