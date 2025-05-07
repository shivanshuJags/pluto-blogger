import { Timestamp } from "firebase/firestore";

export interface Blog {
    id?:string;
    status?:string;
    title: string;
    content: string;
    image: string;
    srcset?: string;
    categories: Category[];
    categorySlugs?: string[];
    author: string;
    author_slug?: string;
    author_id?:string;
    date?: string;
    readTime?: string;
    description?: string;
    createdAt: Timestamp;
    slug?: string;
    rating?: number;
    trending?: boolean;
    [key: string]: any;
}

export interface Category {
    name: string;
    slug: string;
    id: string;
}

export interface BlogState {
    blogs: Blog[];
    selectedBlog: Blog | null;
    error: any;
}