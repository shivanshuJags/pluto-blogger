import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  blogs = [
    {
      title: 'How Tech Shapes the Future of Work in 2024',
      author: 'Ethan Caldwell',
      date: 'October 16, 2024',
      image: 'assets/images/blog-1.png',
      categories: ['Business', 'News'],
      content: `In today’s ever-evolving world, storytelling has become a powerful tool for connection...`,
    },
    {
      title: 'The Future of Work: Tech and Remote Trends',
      author: 'Ethan Caldwell',
      date: 'September 29, 2024',
      image: 'assets/images/blog-2.png',
      categories: ['Sport', 'Travel'],
      readTime: '3 Min Read',
      content: `Find out why 2024 is predicted to be a pivotal year for sports tech and its impact...`,
    },
  ];
}
