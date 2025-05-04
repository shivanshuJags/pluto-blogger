import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'authorDate'
})
export class AuthorDatePipe implements PipeTransform {
  transform(createdAt: Timestamp, author: string): string {
    const dateObj = createdAt.toDate();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return `${author} on ${formattedDate}`;
  }

}
