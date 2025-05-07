import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Blog, BlogState } from '../../types/blog.type';
import { selectAuthState } from '../auth/auth.selectors';

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

export const selectCurrentUserId = createSelector(
    selectAuthState,
    (state) => state?.uid ?? undefined
);

export const selectDraftBlogsByCurrentUser = createSelector(
    selectAllBlogs,
    selectCurrentUserId,
    (blogs: Blog[], uid: string | undefined) => {
        return blogs.filter(blog => blog.status === 'draft' && blog.author_id === uid);
    }
);