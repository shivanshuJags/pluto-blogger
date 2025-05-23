import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, collection as firestoreCollection } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { addDoc, getDocs } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { Blog } from '../../../utils/types/blog.type';
import { Category } from '../types/blogs.type';

@Injectable({
  providedIn: 'root'
})
export class BlogQueryService {
  private firestore = inject(Firestore);

  getCategories(): Observable<Category[]> {
    const categoriesRef = collection(this.firestore, 'categories');
    return collectionData(categoriesRef, { idField: 'id' }) as Observable<Category[]>;
  }

  createPost(post: Blog): Observable<Blog> {
    const postsRef = firestoreCollection(this.firestore, 'posts');
    return from(addDoc(postsRef, post)).pipe(
      map(docRef => ({ ...post, id: docRef.id })) // return blog with Firestore ID
    );
  }

  getPostsByCategory(categorySlug: string): Observable<any[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('categorySlugs', 'array-contains', categorySlug));
    return collectionData(q, { idField: 'slug' });
  }

  getPostBySlug(slug: string): Observable<Blog> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('slug', '==', slug));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          return { id: doc.id, ...doc.data() } as Blog;
        } else {
          throw new Error('Blog post not found');
        }
      })
    );
  }

  getAllPosts(): Observable<Blog[]> {
    const postsRef = collection(this.firestore, 'posts');
    return collectionData(postsRef, { idField: 'slug' }) as Observable<Blog[]>;
  }

  getPostsByAuthor(authorName: string): Observable<Blog[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('author', '==', authorName));
    return collectionData(q, { idField: 'slug' }) as Observable<Blog[]>;
  }

  getTopRatedPosts(minRating = 4): Observable<Blog[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('rating', '>', minRating));
    return collectionData(q, { idField: 'slug' }) as Observable<Blog[]>;
  }

  getTrendingPosts(): Observable<Blog[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('trending', '==', true));
    return collectionData(q, { idField: 'slug' }) as Observable<Blog[]>;
  }

  searchPosts(query: string): Observable<Blog[]> {
    const postsRef = collection(this.firestore, 'posts');
    return collectionData(postsRef, { idField: 'slug' }).pipe(
      map((posts: DocumentData[]) =>
        posts
          .map(post => post as Blog)
          .filter(post => {
            const lowerQuery = query.toLowerCase();
            return (
              post.title?.toLowerCase().includes(lowerQuery) ||
              post.author?.toLowerCase().includes(lowerQuery) ||
              post.slug?.toLowerCase().includes(lowerQuery) ||
              post.categorySlugs?.some(cat => cat.toLowerCase().includes(lowerQuery))
            );
          })
      )
    );
  }
}
