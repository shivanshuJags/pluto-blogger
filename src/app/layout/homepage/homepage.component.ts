import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { NewsletterComponent } from '../../shared/newsletter/newsletter.component';
import { HomeLayoutComponent } from '../../blogs/home-layout/home-layout.component';
import { BlogListComponent } from '../../blogs/blog-list/blog-list.component';
import { BlogCardComponent } from '../../blogs/blog-card/blog-card.component';
import { selectAllBlogs } from '../../utils/store/blogs/blog.selectors';
import { loadBlogs } from '../../utils/store/blogs/blog.actions';
import { Blog } from '../../utils/types/blog.type';

@Component({
  selector: 'app-homepage',
  imports: [HeroBannerComponent, BadgeComponent,
    NewsletterComponent, CommonModule, BlogListComponent, BlogCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  blogs$: Observable<Blog[]>;

  constructor(private store: Store) {
    this.blogs$ = this.store.select(selectAllBlogs);
  }

  ngOnInit(): void {
    this.store.dispatch(loadBlogs());
  }
}