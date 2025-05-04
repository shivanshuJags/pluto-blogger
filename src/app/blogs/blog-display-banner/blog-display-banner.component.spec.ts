import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDisplayBannerComponent } from './blog-display-banner.component';

describe('BlogDisplayBannerComponent', () => {
  let component: BlogDisplayBannerComponent;
  let fixture: ComponentFixture<BlogDisplayBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDisplayBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDisplayBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
