// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  isDarkTheme: boolean = false;
  private renderer: Renderer2;
  private storageKey = "app_theme";

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isDarkTheme = this.getStoredTheme();
    this.updateBodyClass(); // Apply initial body class based on theme
  }

  private getStoredTheme(): boolean {
    const storedTheme = localStorage.getItem(this.storageKey);
    return storedTheme === "dark";
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem(this.storageKey, this.isDarkTheme ? "dark" : "light");
    this.updateBodyClass(); // Update body class when theme changes
  }

  private updateBodyClass() {
    const body = document.querySelector("body");
    if (this.isDarkTheme) {
      this.renderer.addClass(body, "dark");
    } else {
      this.renderer.removeClass(body, "dark");
    }
  }
}
