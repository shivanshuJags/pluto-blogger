import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Editor, NgxEditorMenuComponent, NgxEditorModule, Toolbar } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';

@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule, NgxEditorMenuComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css',
})
export class CreateBlogComponent {
  editor!: Editor;
  postForm!: FormGroup;
  status: 'draft' | 'published' | 'scheduled' = 'draft';

  previewMode = false;
  previewData: any = null;
  categories: Array<{ id: string; name: string }> = [];

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

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer,
    private blogQueryService: BlogQueryService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      category: [[], Validators.required],
      description: ['', Validators.required],
      scheduleDate: [''],
      editorContent: [null, Validators.required],
    });

    this.blogQueryService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  saveAsDraft() {
    this.status = 'draft';
  }

  addCategory(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const control = this.postForm.get('category');
    if (selectedId && !control?.value.includes(selectedId)) {
      control?.setValue([...control.value, selectedId]);
    }
    // Reset selected UI
    (event.target as HTMLSelectElement).selectedIndex = 0;
  }

  removeCategory(id: string) {
    const control = this.postForm.get('category');
    control?.setValue(control.value.filter((catId: string) => catId !== id));
  }

  getCategoryNameById(id: string): string {
    const category = this.categories.find(cat => cat.id === id);
    return category?.name || 'Unknown';
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
    const { title, category, editorContent, description } = this.previewData;

    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const formattedRichText = {
      type: 'doc',
      content: editorContent.content,
    };

    // Map full category info (id, name, slug)
    const selectedCategories = category.map((catId: string) => {
      const found = this.categories.find(cat => cat.id === catId);
      return {
        id: found?.id,
        name: found?.name,
        slug: found?.name.toLowerCase().replace(/\s+/g, '-'),
      };
    });

    const categorySlugs = selectedCategories.map((cat: { slug: any; }) => cat.slug);

    const post = {
      title,
      slug,
      description,
      content: formattedRichText,
      categories: selectedCategories,
      categorySlugs: categorySlugs,
      createdAt: new Date(),
      status: this.status,
    };

    this.blogQueryService.createPost(post).then((res) => {
      this.previewMode = false;
      this.postForm.reset();
    }).catch((err) => {
      console.error('Error saving post to Firestore:', err);
    });
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
