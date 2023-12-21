import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashlayout',
  templateUrl: './dashlayout.component.html',
  styleUrls: ['./dashlayout.component.scss']
})
export class DashlayoutComponent {
  @ViewChild('leftMenu') leftMenu: MatSidenav;
  isSmallScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { }
  ngAfterViewInit() {
    this.initializeScreenMode();
  }

  initializeScreenMode() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  toggleLeftMenu() {
    this.leftMenu.toggle();
  }

  onMenuItemClick() {
    // Close the left menu when a menu item is clicked on a small screen
    if (this.isSmallScreen) {
      this.leftMenu.close();
    }
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

  top(t) {
    t.scrollTo(0, 0);
    window.scroll(0, 0);
  }

}
