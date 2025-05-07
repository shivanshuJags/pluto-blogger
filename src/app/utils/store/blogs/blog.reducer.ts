import { createReducer, on } from '@ngrx/store';
import { BlogState } from '../../types/blog.type';
import * as BlogActions from './blog.actions';

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
    })),
    on(BlogActions.setSelectedBlog, (state, { blog }) => ({
        ...state,
        selectedBlog: blog
    })),
    on(BlogActions.createBlogSuccess, (state, { blog }) => ({
        ...state,
        blogs: [blog, ...state.blogs],
    })),
    on(BlogActions.createBlogFailure, (state, { error }) => ({ ...state, error }))
);
