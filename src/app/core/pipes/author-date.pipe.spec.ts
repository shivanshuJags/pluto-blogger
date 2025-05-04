import { AuthorDatePipe } from './author-date.pipe';

describe('AuthorDatePipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorDatePipe();
    expect(pipe).toBeTruthy();
  });
});
