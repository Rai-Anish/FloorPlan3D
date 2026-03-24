export interface User {
    id: number;
    email: string;
    username: string;
    provider: string;
    avatar: string | null;
    isVerified: boolean;
    createdAt: string;
}

export interface Project {
    id: number;
    title: string;
    prompt: string | null;
    originalImageUrl: string | null;
    imageUrl: string | null;
    visibility: "PRIVATE" | "COMMUNITY";
    provider: string;
    createdAt: string;
    updatedAt: string;
    user: {
        username: string;
        avatar: string | null;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}