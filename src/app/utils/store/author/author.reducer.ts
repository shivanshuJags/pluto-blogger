import { createReducer, on } from '@ngrx/store';
import * as AuthorActions from './author.actions';
import { Author } from '../../types/author.type';

export interface AuthorState {
    authors: Author[];
    selectedAuthor: Author | null;
    loading: boolean;
    error: any;
}

export const initialState: AuthorState = {
    authors: [],
    selectedAuthor: null,
    loading: false,
    error: null,
};

export const authorReducer = createReducer(
    initialState,
    on(AuthorActions.loadAuthors, state => ({ ...state, loading: true })),
    on(AuthorActions.loadAuthorsSuccess, (state, { authors }) => ({ ...state, authors, loading: false })),
    on(AuthorActions.loadAuthorsFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(AuthorActions.loadAuthorByName, state => ({ ...state, loading: true })),
    on(AuthorActions.loadAuthorByNameSuccess, (state, { author }) => ({ ...state, selectedAuthor: author, loading: false })),
    on(AuthorActions.loadAuthorByNameFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
