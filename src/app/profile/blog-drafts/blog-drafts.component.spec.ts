import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDraftsComponent } from './blog-drafts.component';

describe('BlogDraftsComponent', () => {
  let component: BlogDraftsComponent;
  let fixture: ComponentFixture<BlogDraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDraftsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
