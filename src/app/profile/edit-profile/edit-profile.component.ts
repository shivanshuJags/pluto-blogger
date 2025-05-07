import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from '../../utils/types/auth.type';
import { Store } from '@ngrx/store';
import { selectAuthUser, selectCurrentUserId } from '../../utils/store/auth/auth.selectors';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  profileForm!: FormGroup;
  profileImagePreview: string = 'assets/images/anonymus.png';
  selectedImageFile: File | null = null;

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: [''],
      bio: [''] 
    });

    this.store.select(selectAuthUser).subscribe((user: AuthState | null) => {
      if (user) {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          city: user.city || '',
          state: user.state || '',
          zip: user.zip || '',
          country: user.country || '',
          bio: user.bio || ''
        });
        if (user.photoURL) {
          this.profileImagePreview = user.photoURL;
        }
      }
    });
  }

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    firstValueFrom(this.store.select(selectCurrentUserId)).then(uid => {
      if (uid) {
        const profileData = {
          ...this.profileForm.value,
          photoURL: this.profileImagePreview
        };
        this.authService.updateAuthorProfile(uid, profileData).subscribe({
          next: () => {
            console.log('Profile updated');
          },
          error: (err) => {
            console.error('Error updating profile:', err);
          }
        });
      }
    });
  }
}
