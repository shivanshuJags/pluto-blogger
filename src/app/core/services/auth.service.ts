import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Auth, GoogleAuthProvider, signInWithPhoneNumber, signInWithPopup, signOut } from '@angular/fire/auth';
import { getAuth, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';

import * as AuthActions from '../../utils/store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private recaptchaVerifier!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;

  private userSubject = new BehaviorSubject<any>(this.getUserData());
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private router: Router, private store: Store) { }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email!,
            name: user.displayName!,
            photoURL: user.photoURL!,
          };
          sessionStorage.setItem('user', JSON.stringify(userData));
          this.userSubject.next(user);
          this.store.dispatch(AuthActions.setUser(userData));
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.error('Google login error:', error);
      });
  }

  setupRecaptcha(containerId: string) {
    const firebaseAuth = getAuth(); // Fix: Get actual Firebase Auth instance
    this.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, containerId, {
      size: 'invisible',
      callback: (response: any) => {
        console.log('reCAPTCHA solved', response);
      }
    });
  }

  async signInWithPhone(phoneNumber: string) {
    const firebaseAuth = getAuth(); // Fix: Firebase Auth instance needed here too
    this.confirmationResult = await signInWithPhoneNumber(
      firebaseAuth,
      phoneNumber,
      this.recaptchaVerifier
    );
    return this.confirmationResult;
  }

  async confirmOTP(code: string) {
    return await this.confirmationResult.confirm(code).then((result) => {
      console.log('OTP verified:', result.user);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('OTP verification failed:', error);
      throw error;
    });
  }

  logout() {
    return signOut(this.auth).then(() => {
      sessionStorage.removeItem('user');
      this.store.dispatch(AuthActions.clearUser());
      this.userSubject.next(null);
      this.router.navigate(['/login']);
    });
  }

  getUserData() {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
