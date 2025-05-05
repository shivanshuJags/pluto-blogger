import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { NewsletterComponent } from '../../shared/newsletter/newsletter.component';

@Component({
  selector: 'app-homepage',
  imports: [HeroBannerComponent, BadgeComponent, NewsletterComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
}