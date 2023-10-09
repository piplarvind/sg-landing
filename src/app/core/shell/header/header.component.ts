import { Component, OnInit, Input } from "@angular/core";

let ref = null;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

export function headerCompRef() {
  return ref;
}
