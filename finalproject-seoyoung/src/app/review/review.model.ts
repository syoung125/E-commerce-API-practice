export interface Review {
    id? : string;
    productId: string;
    userId: string;
    date: string;
    star: number;
    content: string;
}