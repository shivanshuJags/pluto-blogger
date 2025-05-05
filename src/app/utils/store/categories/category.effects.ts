import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from './category.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

import { BlogQueryService } from '../../../core/services/graphql/blog-query.service';

@Injectable()
export class CategoryEffects {
    private actions$ = inject(Actions);
    private blogQueryService = inject(BlogQueryService);

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.loadCategories),
            mergeMap(() =>
                this.blogQueryService.getCategories().pipe(
                    map(categories => CategoryActions.loadCategoriesSuccess({ categories })),
                    catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
                )
            )
        )
    );
}
