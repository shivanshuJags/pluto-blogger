export interface Author {
    name: string;
    slug: string;
    location: string;
    profile_photo: string;
    description: string;
    profession: string;
}

export interface AuthorState {
    author: Author | null;
    loading: boolean;
    error: any;
}