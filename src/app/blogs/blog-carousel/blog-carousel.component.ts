import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-blog-carousel',
  imports: [CarouselModule, CommonModule],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.css'
})
export class BlogCarouselComponent {
  slides = [
    {
      image: 'https://source.unsplash.com/1600x900/?nature,water',
      tags: ['Nature', 'Travel'],
      author: 'Jane Doe',
      date: 'April 25, 2025',
      readTime: '4 min read',
      title: 'Explore the Wonders of Nature',
      subtitle: 'Discover the most breathtaking destinations on Earth.',
      link: '#',
    },
    {
      image: 'https://source.unsplash.com/1600x900/?technology,future',
      tags: ['Tech', 'Innovation'],
      author: 'John Smith',
      date: 'May 1, 2025',
      readTime: '3 min read',
      title: 'The Future of Technology',
      subtitle: 'How innovations are shaping the next generation.',
      link: '#',
    },
    // Add more slides as needed
  ];

  currentSlide = 0;

  carouselOptions: OwlOptions = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    nav: false,
  };
}
