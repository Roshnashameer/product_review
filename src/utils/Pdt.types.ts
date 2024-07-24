export interface Product {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    rating: number;
}

export interface Comment {
    id: string;
    productId: string;
    userId: string | null;
    userName: string | null;
    content: string;
    replies: Reply[];
    
    
}

export interface Reply {
    id: string;
    commentId: string;
    userId: string | null;
    userName: string | null;
    content: string;

}
