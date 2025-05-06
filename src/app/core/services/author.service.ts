import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Author } from '../../utils/types/author.type';
import { collection, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private firestore: Firestore) { }

  // Get all authors
  getAllAuthors(): Observable<Author[]> {
    const authorCollection = collection(this.firestore, 'author');
    return from(getDocs(authorCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data() as Author))
    );
  }

  // Get a single author by name
  getAuthorByName(name: string): Observable<Author> {
    const authorCollection = collection(this.firestore, 'author');
    const q = query(authorCollection, where('slug', '==', name));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (snapshot.empty) throw new Error('Author not found');
        return snapshot.docs[0].data() as Author;
      })
    );
  }
}
