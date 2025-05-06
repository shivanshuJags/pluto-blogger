import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthorActions from './author.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthorService } from '../../../core/services/author.service';

@Injectable()
export class AuthorEffects {
    private actions$ = inject(Actions);
    private authorService = inject(AuthorService);

    loadAuthors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthorActions.loadAuthors),
            mergeMap(() =>
                this.authorService.getAllAuthors().pipe(
                    map(authors => AuthorActions.loadAuthorsSuccess({ authors })),
                    catchError(error => of(AuthorActions.loadAuthorsFailure({ error })))
                )
            )
        )
    );

    loadAuthorByName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthorActions.loadAuthorByName),
            mergeMap(({ name }) =>
                this.authorService.getAuthorByName(name).pipe(
                    map(author => AuthorActions.loadAuthorByNameSuccess({ author })),
                    catchError(error => of(AuthorActions.loadAuthorByNameFailure({ error })))
                )
            )
        )
    );
}
