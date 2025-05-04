import { Component } from '@angular/core';
import { BlogDisplayBannerComponent } from '../blog-display-banner/blog-display-banner.component';
import { CommonModule } from '@angular/common';
import { SocialComponent } from '../../shared/social/social.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { CommentThreadComponent } from '../../shared/comment-thread/comment-thread.component';
import { TrendingCardsComponent } from '../../shared/trending-cards/trending-cards.component';
import { ActivatedRoute } from '@angular/router';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-display',
  imports: [NgxEditorModule, BlogDisplayBannerComponent, CommonModule, SocialComponent, TrendingCardsComponent, BlogCardComponent, CommentThreadComponent],
  templateUrl: './blog-display.component.html',
  styleUrl: './blog-display.component.css'
})
export class BlogDisplayComponent {
  commentsCount: number = 4;
  commentsVisible: boolean = false;
  blog: any = null;
  htmlContent: SafeHtml = '';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private blogQueryService: BlogQueryService) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogQueryService.getPostBySlug(slug).subscribe(post => {
        this.blog = post;
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
          this.renderContent(post['content'])
        );
      });
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
