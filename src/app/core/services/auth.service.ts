import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Auth, GoogleAuthProvider, signInWithPhoneNumber, signInWithPopup, signOut } from '@angular/fire/auth';
import { getAuth, RecaptchaVerifier, ConfirmationResult, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, GithubAuthProvider, sendPasswordResetEmail } from 'firebase/auth';

import * as AuthActions from '../../utils/store/auth/auth.actions';
import { doc, setDoc } from 'firebase/firestore';
import { docData, Firestore } from '@angular/fire/firestore';
import { AuthState } from '../../utils/types/auth.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private recaptchaVerifier!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;

  private userSubject = new BehaviorSubject<any>(this.getUserData());
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private router: Router, private store: Store, private firestore: Firestore) { }

  async signUpWithEmail(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email!,
        name: user.displayName || '',
        photoURL: user.photoURL || '',
      };

      sessionStorage.setItem('user', JSON.stringify(userData));
      this.userSubject.next(user);
      this.store.dispatch(AuthActions.setUser(userData));

      return userCredential;
    } catch (error) {
      console.error('Email sign-up error:', error);
      throw error;
    }
  }

  async signInWithEmail(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email!,
        name: user.displayName || '',
        photoURL: user.photoURL || '',
      };

      sessionStorage.setItem('user', JSON.stringify(userData));
      this.userSubject.next(user);
      this.store.dispatch(AuthActions.setUser(userData));
      this.router.navigate(['/']);

      return userCredential;
    } catch (error) {
      console.error('Email sign-in error:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    const auth = getAuth();
    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false
    };
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error) {
      console.error('Password reset error:', error);
    }
  }

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

  signInWithGitHub(): void {
    const provider = new GithubAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          uid: user.uid,
          email: user.email!,
          name: user.displayName || '',
          photoURL: user.photoURL || '',
        };
        sessionStorage.setItem('user', JSON.stringify(userData));
        this.userSubject.next(user);
        this.store.dispatch(AuthActions.setUser(userData));
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('GitHub login error:', error);
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

  updateAuthorProfile(uid: string, profileData: AuthState): Observable<void> {
    const docRef = doc(this.firestore, 'author', uid);
    return from(setDoc(docRef, profileData, { merge: true }));
  }

  getAuthorById(uid: string): Observable<AuthState> {
    const ref = doc(this.firestore, 'author', uid);
    return docData(ref) as Observable<AuthState>;
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
