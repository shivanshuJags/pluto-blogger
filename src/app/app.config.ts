import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/env.prod';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideEffects } from '@ngrx/effects';
import { CategoryEffects } from './utils/store/categories/category.effects';
import { categoryReducer } from './utils/store/categories/category.reducer';
import { authReducer } from './utils/store/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    // NgRx Store Setup (just call provideStore ONCE)
    provideStore({ category: categoryReducer, auth: authReducer }),
    provideEffects([CategoryEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

    provideAnimations(),
  ],
};

