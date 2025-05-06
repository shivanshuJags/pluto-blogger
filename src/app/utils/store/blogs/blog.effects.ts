import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as BlogActions from './blog.actions';
import { BlogQueryService } from '../../../core/services/graphql/blog-query.service';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BlogEffects {
    private actions$ = inject(Actions);
    private blogQueryService = inject(BlogQueryService);
    private router = inject(Router);

    loadAllBlogs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.loadBlogs),
            mergeMap(() =>
                this.blogQueryService.getAllPosts().pipe(
                    map(blogs => BlogActions.loadBlogsSuccess({ blogs })),
                    catchError(error => of(BlogActions.loadBlogsFailure({ error })))
                )
            )
        )
    );
    loadBlogBySlug$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.loadBlogBySlug),
            mergeMap(({ slug }) =>
                this.blogQueryService.getPostBySlug(slug).pipe(
                    map(blog => BlogActions.loadBlogBySlugSuccess({ blog })),
                    catchError(error => of(BlogActions.loadBlogBySlugFailure({ error })))
                )
            )
        )
    );
    createBlog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.createBlog),
            mergeMap(({ blog }) =>
                this.blogQueryService.createPost(blog).pipe(
                    map((savedBlog) => BlogActions.createBlogSuccess({ blog: savedBlog })),
                    catchError(error => of(BlogActions.createBlogFailure({ error })))
                )
            )
        )
    );
    redirectOnCreateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.createBlogSuccess),
            tap(() => this.router.navigate(['/']))
        ),
        { dispatch: false }
    );
}