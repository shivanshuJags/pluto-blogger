import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';
import { util } from '../../utils/common/utils';

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css'
})
export class HeroBannerComponent {
  readonly SearchIcon = SearchIcon;
  searchText: string = '';
  recentSearches: string[] = [];
  invalidSearchInput: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const saved = localStorage.getItem('recentSearches');
    this.recentSearches = saved ? JSON.parse(saved) : [];
  }

  search(): void {
    const term = this.searchText.trim();
    if (!term || util.isGibberish(term)) {
      this.invalidSearchInput = true;
      return;
    }
    this.invalidSearchInput = false;
    if (this.isValidSearch(term)) {
      const slug = util.slugify(term);
      this.router.navigate(['/bloglist'], { queryParams: { q: slug } });
      this.saveSearch(term);
    }
  }

  isValidSearch(term: string): boolean {
    const regex = /^[a-zA-Z0-9\s]+$/; // Only alphanumeric + space
    return term.length >= 3 && regex.test(term);
  }

  saveSearch(term: string): void {
    if (!this.recentSearches.includes(term)) {
      this.recentSearches.unshift(term);
      if (this.recentSearches.length > 5) {
        this.recentSearches.pop(); // Keep last 5 only
      }
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
    }
  }

  filteredSuggestions(): string[] {
    const input = this.searchText.toLowerCase();
    return this.recentSearches.filter(term => term.toLowerCase().includes(input));
  }

  selectSuggestion(term: string): void {
    this.searchText = term;
    this.search();
  }
}
