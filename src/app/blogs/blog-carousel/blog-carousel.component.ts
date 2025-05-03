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
  currentSlide = 0;

  autoplayInterval = 3000;
  progress = 0;
  private progressTimer: any;

  ngOnInit() {
    this.startProgressBar();
  }

  ngOnDestroy(): void {
    clearInterval(this.progressTimer);
  }

  onSlideChange(event: any) {
    const newIndex = event?.page?.index || 0;
    this.currentSlide = newIndex;
    this.resetProgressBar();
  }

  private startProgressBar() {
    let step = 100 / (this.autoplayInterval / 50); // updates every 50ms
    this.progress = 0;
    this.progressTimer = setInterval(() => {
      this.progress += step;
      if (this.progress >= 100) this.progress = 0;
    }, 50);
  }

  private resetProgressBar() {
    this.progress = 0;
  }
  slides = [
    {
      image: 'assets/images/slider_1.webp',
      tags: ['Nature', 'Travel'],
      author: 'Jane Doe',
      date: 'April 25, 2025',
      readTime: '4 min read',
      title: 'Explore the Wonders of Nature',
      subtitle: 'Discover the most breathtaking destinations on Earth.',
      link: '#',
    },
    {
      image: 'assets/images/slider_3.webp',
      tags: ['Tech', 'Innovation'],
      author: 'John Smith',
      date: 'May 1, 2025',
      readTime: '3 min read',
      title: 'The Future of Technology',
      subtitle: 'How innovations are shaping the next generation.',
      link: '#',
    },
    {
      image: 'assets/images/slider_1.webp',
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

  carouselOptions: OwlOptions = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      640: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1024: {
        items: 1,
      }
    }
  };
}
