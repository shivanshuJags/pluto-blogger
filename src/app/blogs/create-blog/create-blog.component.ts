import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Editor, NgxEditorMenuComponent, NgxEditorModule, Toolbar } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogQueryService } from '../../core/services/graphql/blog-query.service';
import { ngXtoolbar } from '../../utils/types/ngxEditor.type';
import { Blog, Category } from '../../utils/types/blog.type';
import { selectAuthState, selectAuthUser } from '../../utils/store/auth/auth.selectors';
import { AuthState } from '../../utils/types/auth.type';
import * as BlogActions from '../../utils/store/blogs/blog.actions';
import { selectBlogError, selectSelectedBlog } from '../../utils/store/blogs/blog.selectors';
import { Observable } from 'rxjs';
import { selectCategories } from '../../utils/store/categories/category.selectors';
import * as CategoryActions from '../../utils/store/categories/category.actions';

@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule, NgxEditorMenuComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css',
})
export class CreateBlogComponent {
  editor!: Editor;
  showPreview: boolean = false;
  blogForm!: FormGroup;
  toolbar: Toolbar = ngXtoolbar;
  sanitizedContent: SafeHtml = '';
  user: AuthState | null = null;
  thumbnailFile: File | null = null;
  thumbnailPreview: string | null = null;
  status: 'draft' | 'published' | 'scheduled' = 'draft';

  categories$: Observable<Category[]>;
  categoryMap = new Map<string, string>();

  @ViewChild('thumbnailInput') thumbnailInput!: ElementRef;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private store: Store) {
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      content: ['', Validators.required],
      category: [[], Validators.required],
    });

    this.store.select(selectSelectedBlog).subscribe((blog) => {
      if (blog) {
        this.blogForm.patchValue({
          title: blog.title,
          subtitle: blog.description,
          content: blog.content,
          category: blog.categories || [],
        });
      }

    });

    this.store.dispatch(CategoryActions.loadCategories());

    // Create lookup map for category names
    this.categories$.subscribe(cats => {
      this.categoryMap.clear();
      cats.forEach(cat => this.categoryMap.set(cat.id, cat.name));
    });

    this.store.select(selectAuthState).subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  preview(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    const rawHtml = this.blogForm.get('content')?.value || '';
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    this.showPreview = true;
  }

  edit(): void {
    this.showPreview = false;
  }

  onThumbnailSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.thumbnailFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.thumbnailPreview = reader.result as string;
    };
    reader.readAsDataURL(this.thumbnailFile);
  }

  removeThumbnail(): void {
    this.thumbnailFile = null;
    this.thumbnailPreview = null;
    if (this.thumbnailInput) {
      this.thumbnailInput.nativeElement.value = '';
    }
  }

  saveDraft(): void {
    this.createBlog('draft');
  }

  createBlog(status: string) {
    const formData = this.blogForm.value;
    const blogData = {
      ...formData,
      status,
      author: this.user?.name ?? 'Anonymous',
      author_slug: this.user?.name?.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date() as any,
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      thumbnailUrl: this.thumbnailPreview || null
    };
    this.store.dispatch(BlogActions.createBlog({ blog: blogData }));
    this.store.select(selectBlogError).subscribe(error => {
      if (error) {
        alert('Failed to create blog: ' + error.message);
      }
    });
  }

  publish(): void {
    this.createBlog('published');
  }

  addCategory(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const control = this.blogForm.get('category');
    if (selectedId && !control?.value.includes(selectedId)) {
      control?.setValue([...control.value, selectedId]);
    }
    (event.target as HTMLSelectElement).selectedIndex = 0;
  }

  removeCategory(id: string): void {
    const control = this.blogForm.get('category');
    control?.setValue(control.value.filter((catId: string) => catId !== id));
  }

  getCategoryNameById(id: string): string {
    return this.categoryMap.get(id) ?? id;
  }

  get postForm() {
    return this.blogForm;
  }
}
