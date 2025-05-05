import { createAction, props } from '@ngrx/store';
import { Category } from './category.type';

export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction('[Category] Load Categories Success', props<{ categories: Category[] }>());
export const loadCategoriesFailure = createAction('[Category] Load Categories Failure', props<{ error: any }>());
