import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css'
})
export class HeroBannerComponent {
  readonly SearchIcon = SearchIcon; 
  searchText: string = '';

  constructor(private router: Router) { }

  search(): void {
    if (this.searchText.trim()) {
      this.router.navigate(['/bloglist'], { queryParams: { q: this.searchText } });
    }
  }
}
