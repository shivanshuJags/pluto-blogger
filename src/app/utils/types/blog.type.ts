import { Timestamp } from "firebase/firestore";

export interface Blog {
    title: string;
    content: string;
    image: string;
    srcset?: string;
    categories: Category[];
    categorySlugs?: string[];
    author: string;
    author_slug?: string;
    date?: string;
    readTime?: string;
    description?: string;
    createdAt: Timestamp;
    slug?: string;
    rating?: number;
    trending?: boolean;
    [key: string]: any;
    id?:string;
}

export interface Category {
    name: string;
    slug: string;
    id: string;
}