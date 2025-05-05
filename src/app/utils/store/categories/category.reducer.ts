import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { Category } from './category.type';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state) => ({ ...state, loading: true })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, loading: false, categories })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);