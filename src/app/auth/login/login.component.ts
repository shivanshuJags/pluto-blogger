import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  phoneNumber: string = '';
  otp: string = '';
  showOtpInput: boolean = false;

  constructor(private authService: AuthService) { }

  ngAfterViewInit() {
    // Setup reCAPTCHA after view is initialized
    this.authService.setupRecaptcha('recaptcha-container');
  }

  loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  async loginWithPhone(): Promise<void> {
    if (!this.phoneNumber) return;
    const formattedNumber = this.phoneNumber.startsWith('+')
    ? this.phoneNumber
    : `+91${this.phoneNumber}`;
    try {
      await this.authService.signInWithPhone(formattedNumber);
      this.showOtpInput = true;
    } catch (error) {
      console.error('Phone login failed:', error);
    }
  }

  async verifyOtp(): Promise<void> {
    try {
      await this.authService.confirmOTP(this.otp);
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  }
}