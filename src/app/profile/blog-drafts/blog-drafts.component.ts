import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../utils/types/blog.type';
import { Store } from '@ngrx/store';
import { selectDraftBlogsByCurrentUser } from '../../utils/store/blogs/blog.selectors';
import { loadBlogs, setSelectedBlog } from '../../utils/store/blogs/blog.actions';
import { selectAuthUser } from '../../utils/store/auth/auth.selectors';
import { AuthState } from '../../utils/types/auth.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-drafts',
  imports: [CommonModule],
  templateUrl: './blog-drafts.component.html',
  styleUrl: './blog-drafts.component.css'
})
export class BlogDraftsComponent {
  draftBlogs$: Observable<Blog[]>;


  constructor(private store: Store, private router: Router) {
    this.draftBlogs$ = this.store.select(selectDraftBlogsByCurrentUser);
  }

  ngOnInit(): void {
    this.draftBlogs$.subscribe(res => {
      console.log(res)
    });
  }

  editDraft(draftBlog: Blog) {
    this.store.dispatch(setSelectedBlog({ blog: draftBlog }));
    this.router.navigate(['/createpost']);
  }

}
