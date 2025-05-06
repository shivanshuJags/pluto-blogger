import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { Observable } from 'rxjs';
import { selectProfilePhoto, selectUserLoggedIn } from '../../utils/store/auth/auth.selectors';
import { logout, setUser } from '../../utils/store/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  private store = inject(Store);

  mobileMenuOpen = false;
  isDarkMode = false;
  showDropdown = false;

  profilePhoto$: Observable<string | null> = this.store.select(selectProfilePhoto);
  isLoggedIn$: Observable<boolean> = this.store.select(selectUserLoggedIn);
  fallbackPhoto = 'assets/images/next_1.webp';

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = this.fallbackPhoto;
  }

  logout() {
    this.store.dispatch(logout());
    this.closeDropdown();
  }

  ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark');
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      this.store.dispatch(setUser(parsed));
    }
  }
}