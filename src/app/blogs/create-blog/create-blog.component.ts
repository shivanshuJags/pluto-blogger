import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Editor, NgxEditorMenuComponent, NgxEditorModule, Toolbar } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule, NgxEditorMenuComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {
  editor!: Editor;
  postForm!: FormGroup;
  status: 'draft' | 'published' | 'scheduled' = 'draft';

  previewMode = false;
  previewData: any = null;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private fb: FormBuilder,  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      scheduleDate: [''],
      editorContent: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  saveAsDraft() {
    this.status = 'draft';
    console.log('Saved as draft:', this.postForm.value);
  }

  schedulePost() {
    if (this.postForm.valid) {
      this.status = 'scheduled';
      this.previewData = this.postForm.value;
      this.previewMode = true;
    }
  }

  publishNow() {
    if (this.postForm.valid) {
      this.status = 'published';
      this.previewData = this.postForm.value;
      this.previewMode = true;
    }
  }

  confirmPublish() {
    console.log('✅ Confirmed & published:', this.previewData);
    this.previewMode = false;
    this.postForm.reset();
  }

  editPost() {
    this.previewMode = false;
    this.postForm.patchValue(this.previewData);
  }

  triggerImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const url = await this.uploadImage(file);
      if (url) {
        this.editor.commands.insertImage(url);
      }
    };
    input.click();
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  async uploadImage(file: File): Promise<string | null> {
    try {
      const objectUrl = URL.createObjectURL(file);
      return objectUrl;
    } catch (err) {
      console.error('Image upload failed:', err);
      return null;
    }
  }
}
