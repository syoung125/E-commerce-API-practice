export interface Plan {
    id? : string;
    active?: boolean;
    name: string;
    amount: number;
    currency: string;
    interval: string;
    interval_count: number;
}