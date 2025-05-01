import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  email = '';

  subscribe() {
    if (this.email) {
      console.log('Subscribed with email:', this.email);
      // Integrate with your backend or newsletter service
      alert('Thanks for subscribing!');
      this.email = '';
    }
  }
}
