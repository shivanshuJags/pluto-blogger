export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface BlogPost {
    title: string;
    slug: string;
    content: any; // JSON from the editor
    categories: string[];
    createdAt: Date;
    status: 'draft' | 'published' | 'scheduled';
}