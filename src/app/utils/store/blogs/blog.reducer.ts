import { createReducer, on } from '@ngrx/store';
import { Blog } from '../../types/blog.type';
import * as BlogActions from './blog.actions';

export interface BlogState {
    blogs: Blog[];
    selectedBlog: Blog | null;
    error: any;
}

export const initialState: BlogState = {
    blogs: [],
    selectedBlog: null,
    error: null
};

export const blogReducer = createReducer(
    initialState,
    on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({ ...state, blogs })),
    on(BlogActions.loadBlogsFailure, (state, { error }) => ({ ...state, error })),
    on(BlogActions.loadBlogBySlugSuccess, (state, { blog }) => ({
        ...state,
        selectedBlog: blog
    }))
);
