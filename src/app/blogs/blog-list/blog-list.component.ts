import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Blog } from '../../utils/types/blog.type';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { AuthorDatePipe } from '../../core/pipes/author-date.pipe';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadBlogsByAuthor } from '../../utils/store/blogs/blog.actions';
import { selectBlogsByAuthor } from '../../utils/store/blogs/blog.selectors';
import { CeilPipe } from '../../core/pipes/ceil.pipe';
import { PaginatePipe } from '../../core/pipes/paginate.pipe';


@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, PaginationComponent, RouterModule, AuthorDatePipe, CeilPipe, PaginatePipe],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})

export class BlogListComponent {
  @Input() filter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  blogsByAuthor$!: Observable<Blog[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadBlogsByAuthor({ author: this.filter }));
    this.blogsByAuthor$ = this.store.select(selectBlogsByAuthor(this.filter));
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  viewBlog(slug: string) {
    this.router.navigate(['/post', slug]);
  }
}
