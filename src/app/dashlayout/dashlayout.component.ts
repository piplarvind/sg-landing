import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashlayout',
  templateUrl: './dashlayout.component.html',
  styleUrls: ['./dashlayout.component.scss']
})
export class DashlayoutComponent {

  constructor() { }

  ngOnInit() {
   
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Check the scroll position to determine if the header should be sticky
    // this.isSticky = window.scrollY > 50; // Adjust the offset value as needed
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("header-navbar").classList.add("nav-scroll");
      // document.getElementById("paragraph").classList.add("green");
    } else {
      document.getElementById("header-navbar").classList.remove("nav-scroll");
    }
  }
  
}
