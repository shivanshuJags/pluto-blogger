import { Component, OnInit } from '@angular/core';
import { BlogListComponent } from '../blog-list/blog-list.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogCarouselComponent } from '../blog-carousel/blog-carousel.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { Blog } from '../../utils/types/blog.type';

@Component({
  selector: 'app-home-layout',
  imports: [BlogListComponent, BlogCardComponent, BlogCarouselComponent, CommonModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent implements OnInit {

  query: string = '';
  blogs: Blog[] = [];

  constructor(private route: ActivatedRoute, private blogQueryService: BlogQueryService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const rawQuery = params.get('q');
      if (rawQuery) {
        console.log(rawQuery);
        this.blogQueryService.searchPosts(rawQuery).subscribe(blogs => {
          this.blogs = blogs;
        });
      }
    });
  }
}
