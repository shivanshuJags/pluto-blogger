import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  topics = [
    { label: 'Technology', icon: '💻', color: 'text-blue-600' },
    { label: 'Travel', icon: '✈️', color: 'text-orange-500' },
    { label: 'Sport', icon: '🟢', color: 'text-green-600' },
    { label: 'Business', icon: '📘', color: 'text-purple-600' },
    { label: 'Management', icon: '📊', color: 'text-pink-600' },
    { label: 'Trends', icon: '🔥', color: 'text-red-600' },
    { label: 'Startups', icon: '💡', color: 'text-neutral-700 dark:text-white' },
    { label: 'News', icon: '📄', color: 'text-sky-600' },
  ];
}
