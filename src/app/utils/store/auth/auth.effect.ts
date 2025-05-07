import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);

    loadAuthorProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadAuthorProfile),
            mergeMap(({ uid }) =>
                this.authService.getAuthorById(uid).pipe(
                    map((user) => AuthActions.loadAuthorProfileSuccess({ user })),
                    catchError(error => of(AuthActions.loadAuthorProfileFailure({ error })))
                )
            )
        )
    );
}
