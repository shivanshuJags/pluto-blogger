import { Component } from '@angular/core';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { HomeLayoutComponent } from '../../blogs/home-layout/home-layout.component';
import { NewsletterComponent } from '../../shared/newsletter/newsletter.component';

@Component({
  selector: 'app-homepage',
  imports: [HeroBannerComponent, BadgeComponent, HomeLayoutComponent, NewsletterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
