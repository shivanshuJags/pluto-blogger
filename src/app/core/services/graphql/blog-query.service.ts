import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { BlogPost, Category } from '../types/blogs.type';
import { addDoc, DocumentData, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogQueryService {
  constructor(private firestore: Firestore) { }

  getCategories(): Observable<Category[]> {
    const categoriesRef = collection(this.firestore, 'categories');
    return collectionData(categoriesRef, { idField: 'id' }) as Observable<Category[]>;
  }

  createPost(post: BlogPost) {
    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, post);
  }

  getPostsByCategory(categorySlug: string): Observable<any[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('categorySlugs', 'array-contains', categorySlug));
    return collectionData(q, { idField: 'slug' });
  }

  getPostBySlug(slug: string) {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('slug', '==', slug));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          return { id: doc.id, ...doc.data() } as DocumentData;
        } else {
          throw new Error('Blog post not found');
        }
      })
    );
  }
}
