import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Editor, NgxEditorMenuComponent, NgxEditorModule, Toolbar } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { ngXtoolbar } from '../../utils/types/ngxEditor.type';
import { Blog } from '../../utils/types/blog.type';
import { selectAuthState } from '../../utils/store/auth/auth.selectors';
import { AuthState } from '../../utils/types/auth.type';
import * as BlogActions from '../../utils/store/blogs/blog.actions';
import { selectBlogError } from '../../utils/store/blogs/blog.selectors';

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

  toolbar: Toolbar = ngXtoolbar;
  user: AuthState | null = null;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer,
    private blogQueryService: BlogQueryService, private store: Store
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

    this.store.select(selectAuthState).subscribe(user => {
      this.user = user;
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

    const newPost: Blog = {
      title: this.previewData.title,
      description: this.previewData.description,
      content: this.previewData.editorContent,
      image: 'assets/images/js_concepts_300.webp',
      categories: selectedCategories,
      categorySlugs: categorySlugs,
      author: this.user?.name ?? 'Anonymous',
      author_slug: this.user?.name?.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date() as any,
      readTime: this.calculateReadTime(this.previewData.editorContent), // or calculate from content
      rating: 0,
      trending: false,
      slug: this.previewData.title.toLowerCase().replace(/\s+/g, '-')
    };

    this.store.dispatch(BlogActions.createBlog({ blog: newPost }));

    this.store.select(selectBlogError).subscribe(error => {
      if (error) {
        alert('Failed to create blog: ' + error.message);
      }
    });
  }

  calculateReadTime(content: string): string {
    const plainText = this.stripHtml(content);
    const wordCount = plainText.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min`;
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
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
