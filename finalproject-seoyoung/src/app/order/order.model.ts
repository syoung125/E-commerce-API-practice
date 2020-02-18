export interface Order {
    id? : string;
    userId : string;
    productId : string;
    quantity : number;
    price: number;
    date : string;
    status : number;
}