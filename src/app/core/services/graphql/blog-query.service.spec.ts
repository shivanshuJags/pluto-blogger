import { TestBed } from '@angular/core/testing';

import { BlogQueryService } from './blog-query.service';

describe('BlogQueryService', () => {
  let service: BlogQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
