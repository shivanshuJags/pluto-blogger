import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-display-banner',
  imports: [CommonModule],
  templateUrl: './blog-display-banner.component.html',
  styleUrl: './blog-display-banner.component.css'
})
export class BlogDisplayBannerComponent {

  blog = {
    title: 'The Future of Work: Tech and Remote Trends',
    date: 'May 3, 2025',
    readTime: '4 min read',
    coverImage: 'assets/images/slider_1.webp',
    author_name:"Shivanshu Sahu",
    categories: [
      { id: 'tech', name: 'Technology' },
      { id: 'green', name: 'Environment' },
    ]
  };
}
