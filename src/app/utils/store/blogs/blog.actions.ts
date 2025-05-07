import { createAction, props } from '@ngrx/store';
import { Blog } from '../../types/blog.type';

export const loadBlogs = createAction('[Blog] Load All Blogs');
export const loadBlogsSuccess = createAction('[Blog] Load Blogs Success', props<{ blogs: Blog[] }>());
export const loadBlogsFailure = createAction('[Blog] Load Blogs Failure', props<{ error: any }>());

export const loadBlogBySlug = createAction('[Blog] Load Blog By Slug', props<{ slug: string }>());
export const loadBlogBySlugSuccess = createAction('[Blog] Load Blog By Slug Success', props<{ blog: Blog }>());
export const loadBlogBySlugFailure = createAction('[Blog] Load Blog By Slug Failure', props<{ error: any }>());

export const loadBlogsByAuthor = createAction('[Blog] Load Blogs By Author', props<{ author: string }>());
export const loadBlogsByCategory = createAction('[Blog] Load Blogs By Category', props<{ category: string }>());
export const loadTopRatedBlogs = createAction('[Blog] Load Top Rated Blogs');
export const loadTrendingBlogs = createAction('[Blog] Load Trending Blogs');

export const createBlog = createAction('[Blog] Create Blog', props<{ blog: Blog }>());
export const createBlogSuccess = createAction('[Blog] Create Blog Success', props<{ blog: Blog }>());
export const createBlogFailure = createAction('[Blog] Create Blog Failure', props<{ error: any }>());

export const setSelectedBlog = createAction(
    '[Blog] Set Selected Blog',
    props<{ blog: Blog }>()
);

export const saveDraft = createAction(
    '[Blog Editor] Save Draft',
    props<{ blog: Partial<Blog> }>()
);

export const saveDraftSuccess = createAction(
    '[Blog API] Save Draft Success',
    props<{ blog: Blog }>()
);

export const saveDraftFailure = createAction(
    '[Blog API] Save Draft Failure',
    props<{ error: any }>()
);