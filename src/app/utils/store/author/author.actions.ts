import { createAction, props } from '@ngrx/store';
import { Author } from '../../types/author.type';

export const loadAuthors = createAction('[Author] Load All');
export const loadAuthorsSuccess = createAction('[Author] Load All Success', props<{ authors: Author[] }>());
export const loadAuthorsFailure = createAction('[Author] Load All Failure', props<{ error: any }>());

export const loadAuthorByName = createAction('[Author] Load By Name', props<{ name: string }>());
export const loadAuthorByNameSuccess = createAction('[Author] Load By Name Success', props<{ author: Author }>());
export const loadAuthorByNameFailure = createAction('[Author] Load By Name Failure', props<{ error: any }>());
