import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EditProfileComponent } from '../../profile/edit-profile/edit-profile.component';
import { BlogDraftsComponent } from '../../profile/blog-drafts/blog-drafts.component';
import { loadBlogs } from '../../utils/store/blogs/blog.actions';
import { selectAuthUser, selectCurrentUserId } from '../../utils/store/auth/auth.selectors';
import { AuthState } from '../../utils/types/auth.type';
import { Observable, take } from 'rxjs';
import { loadAuthorProfile } from '../../utils/store/auth/auth.actions';

@Component({
  selector: 'app-profile-homepage',
  imports: [CommonModule, SidebarComponent, EditProfileComponent, BlogDraftsComponent],
  templateUrl: './profile-homepage.component.html',
  styleUrl: './profile-homepage.component.css'
})
export class ProfileHomepageComponent {
  activeTab: 'profile' | 'drafts' = 'profile';
  currentUser$: Observable<AuthState | null>;

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectAuthUser);
  }
  ngOnInit(): void {
    this.store.dispatch(loadBlogs());
    this.store.select(selectCurrentUserId).pipe(take(1)).subscribe(uid => {
      if (uid) {
        this.store.dispatch(loadAuthorProfile({ uid }));
      }
    });
  }
}
