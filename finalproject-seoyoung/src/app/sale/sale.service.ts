import { Service, Inject } from "typedi";
import { OrderService } from '../order/order.service';
import { Order } from '../order/order.model';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';

export class SaleService {
    constructor(
        private orderService: OrderService,
        private productService: ProductService    
    ){}

    public getAllSale(): number {
        let totalSales:number = 0;
        this.orderService.findAll()
        .then((order: Order[]) =>
            order.forEach(element => {
                totalSales += element.price;
            })
        )
        return totalSales;
    }

    public getStoreSale(storeId: string): number {
        let totalSales:number = 0;
        this.orderService.findAll()
        .then((order: Order[]) =>
            order.forEach(element => {
                this.productService.findById(element.productId)
                .then((product: Product | null) => {
                    if(product != null){
                        if(product.storeId == storeId){
                            totalSales += element.price;
                        }
                    }
                })
            })
        )
        return totalSales;
    }
}