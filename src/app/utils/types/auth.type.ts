export interface AuthState {
    uid: string | null;
    name: string | null;
    email: string | null;
    photoURL: string | null;
    phone?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
    bio?: string | null;
}