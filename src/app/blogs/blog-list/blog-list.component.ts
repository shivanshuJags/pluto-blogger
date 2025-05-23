import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Blog } from '../../utils/types/blog.type';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { AuthorDatePipe } from '../../core/pipes/author-date.pipe';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadBlogs, loadBlogsByAuthor } from '../../utils/store/blogs/blog.actions';
import { selectAllBlogs, selectBlogsByAuthor } from '../../utils/store/blogs/blog.selectors';
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
  @Input() searchedBlog: Blog[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  blogsByAuthor$!: Observable<Blog[]>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const blogChanged = changes['searchedBlog'];
    const filterChanged = changes['filter'];
    // Always prioritize searchedBlog if it's not empty
    if (this.searchedBlog && this.searchedBlog.length > 0) {
      this.blogsByAuthor$ = of(this.searchedBlog);
    } else if (filterChanged || blogChanged) {
      // If filter changed or searchedBlog became empty
      this.store.dispatch(loadBlogs());
      this.blogsByAuthor$ = this.store.select(selectAllBlogs);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  viewBlog(slug: string) {
    this.router.navigate(['/post', slug]);
  }
}
