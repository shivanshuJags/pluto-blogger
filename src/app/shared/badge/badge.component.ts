import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCategories } from '../../utils/store/categories/category.selectors';
import * as CategoryActions from '../../utils/store/categories/category.actions';
import { Category } from '../../utils/types/blog.type';


@Component({
  selector: 'app-badge',
  imports: [CommonModule, RouterModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {

  categories$!: Observable<Category[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(CategoryActions.loadCategories());
    this.categories$ = this.store.select(selectCategories);
  }
}
