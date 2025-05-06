import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from '../../types/blog.type';

export const selectBlogState = createFeatureSelector<BlogState>('blog');

export const selectAllBlogs = createSelector(selectBlogState, state => state.blogs);
export const selectBlogsByAuthor = (author: string) =>
    createSelector(selectAllBlogs, blogs => blogs.filter(b => b['author_Slug'] === author));

export const selectBlogsByCategory = (categorySlug: string) =>
    createSelector(selectAllBlogs, blogs =>
        blogs.filter(b => Array.isArray(b.categorySlugs) && b.categorySlugs.includes(categorySlug))
    );

export const selectTopRatedBlogs = createSelector(
    selectAllBlogs,
    blogs => blogs.filter(b => (b.rating ?? 0) > 4)
);

export const selectTrendingBlogs = createSelector(
    selectAllBlogs,
    blogs => blogs.filter(b => b.trending === true)
);

export const selectSelectedBlog = createSelector(
    selectBlogState,
    state => state.selectedBlog
);

export const selectBlogError = createSelector(
    selectBlogState,
    state => state.error
);