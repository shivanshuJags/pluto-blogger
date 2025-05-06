import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogInIcon, LucideAngularModule } from 'lucide-angular';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  phoneNumber: string = '';
  otp: string = '';
  showOtpInput: boolean = false;
  authForm!: FormGroup;
  isSigninFlow: boolean = true;
  readonly LogInIcon = LogInIcon;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });

    this.updateConfirmPasswordValidator();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  toggleFlow(): void {
    this.isSigninFlow = !this.isSigninFlow;
    this.authForm.reset();
    this.updateConfirmPasswordValidator();
  }

  updateConfirmPasswordValidator(): void {
    const confirmPassword = this.authForm.get('confirmPassword');
    if (!this.isSigninFlow) {
      confirmPassword?.setValidators([
        Validators.required,
        this.matchPasswordValidator.bind(this)
      ]);
    } else {
      confirmPassword?.clearValidators();
    }
    confirmPassword?.updateValueAndValidity();
  }

  matchPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.authForm && control.value !== this.authForm.get('password')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.authForm.value;

    if (this.isSigninFlow) {
      this.authService.signInWithEmail(email, password).catch((err) => {
        console.error('Sign in failed:', err);
      });
    } else {
      this.authService.signUpWithEmail(email, password).catch((err) => {
        console.error('Sign up failed:', err);
      });
      this.toggleFlow();
    }
  }
  loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  loginWithGitHub(): void {
    this.authService.signInWithGitHub();
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