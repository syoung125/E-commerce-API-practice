import { Service, Inject } from "typedi";
import { ProductService } from './product.service';
import { Product } from './product.model';

@Service()
export class ProductController {
    constructor(
        private productService: ProductService
    ){
        
    }

    /**
     * @api POST /stores/:storeId/products
     * 
     * This method creates a new product of store provided id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body && req.params.storeId){
            const product = req.body;
            const storeId = req.params.storeId;

            this.productService.create(product, storeId)
                .then((newProduct: Product) => {
                    res.send(newProduct);
                });
        }
    }

    /**
     * @api PUT	/stores/:storeId/products/:id
     * 
     * This method updates a product that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req, res, next){
        if(req.body && req.params.storeId && req.params.id){
            const product = req.body;
            product.storeId = req.params.storeId;
            product.id = req.params.id;

            this.productService.update(product, product.storeId)
                .then((updatedProduct: Product | null) => {
                    res.send(updatedProduct);
                });
        }
    }

    /**
     * @api GET /products/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.productService.findById(req.params.id)
                .then((product: Product | null) => {
                    res.send(product);
                });
        }
    }

    /**
     * @api GET /products
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        this.productService.findAll()
            .then((productList: Product[]) => {
                res.send(productList);
            });
    }


    /**
     * @api GET /stores/:storeId/products
     * 
     * Find all products they(specific store) sell
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAllByStore(req, res, next){
        if(req.params.storeId){
            this.productService.findAllByStore(req.params.storeId)
            .then((productList: Product[]) => {
                res.send(productList);
            });
        }
    }

    /**
     * @api GET /products?category=categoryId
     * 
     * Find all products by categoryId
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAllByCategory(req, res, next){
        if(req.query.category){
            this.productService.findAllByCategory(req.query.category)
            .then((productList: Product[]) => {
                res.send(productList);
            });
        }
    }

    /**
     * @api GET /products?min=min&max=max
     * 
     * Find all products by categoryId
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAllByRange(req, res, next){
        if(req.query.min && req.query.max){
            this.productService.findByRange(req.query.min, req.query.max)
            .then((productList: Product[]) => {
                res.send(productList);
            });
        }
    }

    

    /**
     * @api DELETE /stores/:storeId/products/:id
     * 
     * Delete existing product by id of given store
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id && req.params.storeId){
            this.productService.delete(req.params.id, req.params.storeId)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }


    /**
     * @api PATCH /stores/:storeId/products/:id
     * 
     * This method updates a product that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    updateStock(req, res, next){
        if(req.body && req.params.storeId && req.params.id){
            const product = req.body;
            product.storeId = req.params.storeId;
            product.id = req.params.id;

            this.productService.updateStock(product)
                .then((updatedProduct: Product | null) => {
                    res.send(updatedProduct);
                });
        }
    }

}