import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FacebookIcon, LinkedinIcon, LucideAngularModule, MailIcon, TwitterIcon } from 'lucide-angular';

@Component({
  selector: 'app-social',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent {
  readonly MailIcon = MailIcon;
  readonly TwitterIcon = TwitterIcon;
  readonly FacebookIcon = FacebookIcon;
  readonly LinkedinIcon = LinkedinIcon;

  @Input() iconSize: number = 20;

  socialLinks = [
    { href: 'https://facebook.com', icon: 'MailIcon', symbol: MailIcon },
    { href: 'https://twitter.com', icon: 'TwitterIcon', symbol: TwitterIcon },
    { href: 'https://facebook.com', icon: 'LinkedInIcon', symbol: FacebookIcon },
    { href: 'https://twitter.com', icon: 'FacebookIcon', symbol: LinkedinIcon },
  ];
}
