import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Blog } from '../../utils/types/blog.type';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { AuthorDatePipe } from '../../core/pipes/author-date.pipe';


@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, PaginationComponent, RouterModule, AuthorDatePipe],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  currentPage: number = 1;
  itemsPerPage: number = 3;
  blogs: any = [];
  // blogs = [
  //   {
  //     title: 'How Tech Shapes the Future of Work in 2024',
  //     author: 'Ethan Caldwell',
  //     date: 'October 16, 2024',
  //     image: 'assets/images/js_concepts_300.webp',
  //     srcset: `
  //     assets/images/js_concepts_900.webp 900w,
  //     assets/images/js_concepts_600.webp 600w,
  //     assets/images/js_concepts_300.webp 300w
  //   `,
  //     categories: ['Business', 'News'],
  //     content: `In today’s ever-evolving world, storytelling has become a powerful tool for connection...`,
  //   },
  //   {
  //     title: 'The Future of Work: Tech and Remote Trends',
  //     author: 'Ethan Caldwell',
  //     date: 'September 29, 2024',
  //     image: 'assets/images/js_concepts_300.webp',
  //     srcset: `
  //     assets/images/js_concepts_900.webp 900w,
  //     assets/images/js_concepts_600.webp 600w,
  //     assets/images/js_concepts_300.webp 300w
  //   `,
  //     categories: ['Sport', 'Travel'],
  //     readTime: '3 Min Read',
  //     content: `Find out why 2024 is predicted to be a pivotal year for sports tech and its impact...`,
  //   },
  //   {
  //     title: 'How Tech Shapes the Future of Work in 2024',
  //     author: 'Ethan Caldwell',
  //     date: 'October 16, 2024',
  //     image: 'assets/images/js_concepts_300.webp',
  //     srcset: `
  //     assets/images/js_concepts_900.webp 900w,
  //     assets/images/js_concepts_600.webp 600w,
  //     assets/images/js_concepts_300.webp 300w
  //   `,
  //     categories: ['Business', 'News'],
  //     content: `In today’s ever-evolving world, storytelling has become a powerful tool for connection...`,
  //   },
  //   {
  //     title: 'The Future of Work: Tech and Remote Trends',
  //     author: 'Ethan Caldwell',
  //     date: 'September 29, 2024',
  //     image: 'assets/images/js_concepts_300.webp',
  //     srcset: `
  //     assets/images/js_concepts_900.webp 900w,
  //     assets/images/js_concepts_600.webp 600w,
  //     assets/images/js_concepts_300.webp 300w
  //   `,
  //     categories: ['Sport', 'Travel'],
  //     readTime: '3 Min Read',
  //     content: `Find out why 2024 is predicted to be a pivotal year for sports tech and its impact...`,
  //   },
  //   {
  //     title: 'How Tech Shapes the Future of Work in 2024',
  //     author: 'Ethan Caldwell',
  //     date: 'October 16, 2024',
  //     image: 'assets/images/js_concepts_300.webp',
  //     srcset: `
  //     assets/images/js_concepts_900.webp 900w,
  //     assets/images/js_concepts_600.webp 600w,
  //     assets/images/js_concepts_300.webp 300w
  //   `,
  //     categories: ['Business', 'News'],
  //     content: `In today’s ever-evolving world, storytelling has become a powerful tool for connection...`,
  //   },
  //   {
  //     title: 'The Future of Work: Tech and Remote Trends',
  //     author: 'Ethan Caldwell',
  //     date: 'September 29, 2024',
  //     image: 'assets/images/js_concepts_300.webp',
  //     srcset: `
  //     assets/images/js_concepts_900.webp 900w,
  //     assets/images/js_concepts_600.webp 600w,
  //     assets/images/js_concepts_300.webp 300w
  //   `,
  //     categories: ['Sport', 'Travel'],
  //     readTime: '3 Min Read',
  //     content: `Find out why 2024 is predicted to be a pivotal year for sports tech and its impact...`,
  //   },
  // ];

  constructor(private blogQueryService: BlogQueryService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const categorySlug = params['q'];
      if (categorySlug) {
        this.blogQueryService.getPostsByCategory(categorySlug).subscribe(posts => {
          this.blogs = posts;
          console.log(this.blogs)
        });
      }
    });
  }

  get paginatedBlogs(): Blog[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.blogs.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.blogs.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  viewBlog(slug: string) {
    this.router.navigate(['/post', slug]);
  }
}
