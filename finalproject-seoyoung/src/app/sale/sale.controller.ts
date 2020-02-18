import * as HttpStatus from 'http-status-codes';
import { Service } from 'typedi';
import { ErrorService } from '../../error/error';
import { SaleService } from './sale.service';

@Service()
export class SaleController {

  constructor(
    private readonly saleService: SaleService,
    private readonly errorService: ErrorService
  ) {}
  
  /**
   * @api GET /sales
   *
   * Get All sales (Admin)
   *
   * @success
   *   · HTTP 200.
   *   · JSON: operation.
   */
  getAllSales(req, res, next): void {
    //authUser == 'admin'
    let result:number = 0;
    try {
        result = this.saleService.getAllSale();
        res.send({result: result});  
    } catch(e) {
      return next(this.errorService.sendError(res, HttpStatus.BAD_REQUEST));
    }
  }

  /**
   * @api GET /store/:storeId/sales
   *
   * Get store sales by storeId (Store)
   *
   * @success
   *   · HTTP 200.
   *   · JSON: operation.
   */
  getStoreSales(req, res, next): void {
    //authUser == 'store'
    if(req.params.storeId){
        let result:number = 0;
        try {
            result = this.saleService.getStoreSale(req.params.storeId);
            res.send({result: result});  
        } catch(e) {
            return next(this.errorService.sendError(res, HttpStatus.BAD_REQUEST));
        }
    }
  }

}