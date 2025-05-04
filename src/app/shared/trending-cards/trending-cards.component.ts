import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending-cards',
  imports: [CommonModule],
  templateUrl: './trending-cards.component.html',
  styleUrl: './trending-cards.component.css'
})
export class TrendingCardsComponent {
  posts = [
    {
      image: 'assets/images/next_1.webp',
      tags: ['Travel', 'Trends'],
      author: 'Ethan Caldwell',
      date: 'April 25, 2024',
      title: 'Top 10 Travel Gadgets You Must Pack for Your Next Adventure',
      description: 'Discover the must-have gadgets to enhance your next adventure and make traveling more convenient and tech-savvy.',
    },
    {
      image: 'assets/images/next_2.webp',
      tags: ['News', 'Sport'],
      author: 'Ethan Caldwell',
      date: 'May 3, 2024',
      title: 'The Future of Sports: Wearable Tech and Data Analytics',
      description: 'Explore how wearable tech and data analytics are reshaping sports performance and fan engagement in 2024.',
    },
    {
      image: 'assets/images/next_3.webp',
      tags: ['Sport', 'Trends'],
      author: 'Ethan Caldwell',
      date: 'May 15, 2024',
      title: 'Top 5 Trends in Mobile Technology Transforming Sports',
      description: 'Uncover how mobile technology is revolutionizing sports through data analytics, apps, and wearable innovations.',
    },
  ];
}
