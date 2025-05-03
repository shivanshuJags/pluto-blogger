import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { LucideAngularModule, MoonIcon, SunIcon } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  readonly SunIcon = SunIcon;
  readonly MoonIcon = MoonIcon;
  isDarkMode = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  private enableDarkMode() {
    this.renderer.addClass(document.documentElement, 'dark');
    localStorage.setItem('theme', 'dark');
  }

  private disableDarkMode() {
    this.renderer.removeClass(document.documentElement, 'dark');
    localStorage.setItem('theme', 'light');
  }
}
