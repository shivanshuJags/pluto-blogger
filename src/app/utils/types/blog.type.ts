import { Timestamp } from "firebase/firestore";

export interface Blog {
    title: string;
    content: string;
    image: string;
    srcset?: string;
    categories: Category[];
    author: string;
    date: string;
    readTime?: string;
    description?: string;
    createdAt:Timestamp;
    slug?:string;
}

export interface Category {
    name: string;
    slug: string;
    id: string;
}