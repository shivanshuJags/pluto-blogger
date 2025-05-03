export interface Blog {
    title: string;
    content: string;
    image: string;
    srcset?: string;
    categories: string[];
    author: string;
    date: string;
    readTime?: string;
}