import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHomepageComponent } from './profile-homepage.component';

describe('ProfileHomepageComponent', () => {
  let component: ProfileHomepageComponent;
  let fixture: ComponentFixture<ProfileHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
