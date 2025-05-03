import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SocialComponent } from '../../shared/social/social.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, SocialComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  openSection: number | null = null;

  footerSections = [
    {
      title: 'Homepages',
      links: [
        { label: 'Classic List', href: '#' },
        { label: 'Classic Grid', href: '#' },
        { label: 'Classic Overlay', href: '#' },
        { label: 'Hero Slider', href: '#' },
        { label: 'Featured Posts', href: '#' },
      ],
    },
    {
      title: 'Categories',
      links: [
        { label: 'Technology', href: '#' },
        { label: 'Travel', href: '#' },
        { label: 'Sport', href: '#' },
        { label: 'Business', href: '#' },
      ],
    },
    {
      title: 'Pages',
      links: [
        { label: 'About', href: '#' },
        { label: 'Categories', href: '#' },
        { label: 'Contacts', href: '#' },
      ],
    },
  ];

  toggleSection(index: number): void {
    this.openSection = this.openSection === index ? null : index;
  }
}
