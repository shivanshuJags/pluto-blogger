import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../utils/types/blog.type';
import { AuthorDatePipe } from '../../core/pipes/author-date.pipe';

@Component({
  selector: 'app-blog-display-banner',
  imports: [CommonModule, AuthorDatePipe],
  templateUrl: './blog-display-banner.component.html',
  styleUrl: './blog-display-banner.component.css'
})
export class BlogDisplayBannerComponent {

  @Input() blogData: Observable<Blog | null> | undefined;
  blog: Blog | null | undefined;

  ngOnInit(): void {
    this.blogData?.subscribe(res => {
      this.blog = res;
      console.log(res);
    })
  }
}
