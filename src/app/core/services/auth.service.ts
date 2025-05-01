import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPhoneNumber, signInWithPopup, signOut } from '@angular/fire/auth';
import { getAuth, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private recaptchaVerifier!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;

  constructor(private auth: Auth, private router: Router) { }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('User:', result.user);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
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
      this.router.navigate(['/login']);
    });
  }
}
