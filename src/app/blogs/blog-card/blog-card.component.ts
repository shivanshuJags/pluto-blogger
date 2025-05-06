import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthorActions from '../../utils/store/author/author.actions';
import { selectAllAuthors, selectSelectedAuthor } from '../../utils/store/author/author.selectors';
import { Observable } from 'rxjs';
import { Author } from '../../utils/types/author.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {

  @Input() blogType: string = ''; // 'author' or a specific author name
  author$!: Observable<Author | null>;
  allAuthors$!: Observable<Author[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(AuthorActions.loadAuthors());
    if (this.blogType === 'author') {
      this.allAuthors$ = this.store.select(selectAllAuthors);
    } else if (this.blogType && this.blogType !== 'author') {
      this.store.dispatch(AuthorActions.loadAuthorByName({ name: this.blogType }));
      this.author$ = this.store.select(selectSelectedAuthor);
    }
  }
}
