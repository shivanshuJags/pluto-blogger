import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { BlogDisplayBannerComponent } from '../blog-display-banner/blog-display-banner.component';
import { SocialComponent } from '../../shared/social/social.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { CommentThreadComponent } from '../../shared/comment-thread/comment-thread.component';
import { TrendingCardsComponent } from '../../shared/trending-cards/trending-cards.component';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { Blog } from '../../utils/types/blog.type';
import { loadBlogBySlug } from '../../utils/store/blogs/blog.actions';
import { selectSelectedBlog } from '../../utils/store/blogs/blog.selectors';

@Component({
  selector: 'app-blog-display',
  imports: [NgxEditorModule, BlogDisplayBannerComponent, CommonModule, SocialComponent, TrendingCardsComponent, BlogCardComponent, CommentThreadComponent],
  templateUrl: './blog-display.component.html',
  styleUrl: './blog-display.component.css'
})
export class BlogDisplayComponent {
  commentsCount: number = 4;
  commentsVisible: boolean = false;

  blog$!: Observable<Blog | null>;
  htmlContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private store: Store
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.store.dispatch(loadBlogBySlug({ slug }));
      this.blog$ = this.store.select(selectSelectedBlog).pipe(
        filter(blog => !!blog),
        map(blog => {
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.renderContent(blog!.content));
          return blog!;
        })
      );
    }
  }

  renderContent(node: any): string {
    if (!node || !node.type) return '';

    switch (node.type) {
      case 'paragraph':
        return `<p>${(node.content || []).map((c: any) => this.renderContent(c)).join('')}</p>`;
      case 'heading':
        const level = node.attrs?.level || 1;
        return `<h${level}>${(node.content || []).map((c: any) => this.renderContent(c)).join('')}</h${level}>`;
      case 'blockquote':
        return `<blockquote>${(node.content || []).map((c: any) => this.renderContent(c)).join('')}</blockquote>`;
      case 'code_block':
        return `<pre><code>${(node.content || []).map((c: any) => this.renderContent(c)).join('')}</code></pre>`;
      case 'text':
        return node.text || '';
      default:
        return (node.content || []).map((c: any) => this.renderContent(c)).join('');
    }
  }
}
