import { Router } from 'express';
import { Service } from 'typedi';
import { ProductController } from '../../app/product/product.controller';
import { AuthController } from '../../app/auth/auth.controller';
import { UserController } from '../../app/user/user.controller';
import { CategoryController } from '../../app/category/category.controller';
import { StoreController } from '../../app/store/store.controller';
import { CartController } from '../../app/cart/cart.controller';
import { OrderController } from '../../app/order/order.controller';
import { ReviewController } from '../../app/review/review.controller';
import { SaleController } from '../../app/sale/sale.controller';
// import { swaggerUi } from 'swagger-ui-express';
// import { swaggerDocument } from './swagger.json';

@Service()
export class Api {
  private apiRouter: Router;
  private authRouter: Router;
  private storeRouter: Router;

  constructor( 
    private authController: AuthController,
    private storeController: StoreController,
    private userController: UserController,
    private categoryController: CategoryController,
    private productController: ProductController,
    private cartController: CartController,
    private orderController: OrderController,
    private reviewController: ReviewController,
    private saleController: SaleController
  ) {
    this.initRouterAndSetApiRoutes();
    this.initRouterAndSetAuthRoutes();
  }

  getApiRouter(): Router {
    return this.apiRouter;
  }

  // getStoreRouter(): Router{
  //   return this.storeRouter;
  // }

  // getUserRouter(): Router{
  //   return this.storeRouter;
  // }

  getAuthRouter(): Router {
    return this.authRouter;
  }
   
  initRouterAndSetAuthRoutes(): void{
    this.authRouter = Router();

    this.authRouter.post(
      '/',
      (req, res, next) => this.authController.auth(req, res)
    );
    this.authRouter.post(
      '/users',
      (req, res, next) => this.storeController.create(req, res, next)
    );
    this.authRouter.post(
      '/stores',
      (req, res, next) => this.storeController.create(req, res, next)
    );
  }
  
  private initRouterAndSetApiRoutes(): void {
    this.apiRouter = Router();

    // this.apiRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // this.apiRouter.use('/api/v1', Router);

    this.setUserApiRouters();
    this.setStoreApiRouters();
    //setRoutes
    this.setCategoryApiRoutes();  // category
    this.setProductApiRoutes();  // product
    this.setCartApiRoutes();  // cart
    this.setOrderApiRoutes(); // order
    this.setReviewApiRoutes();  // reveiw
    this.setSaleApiRoutes();  // reveiw
  }

  private setCategoryApiRoutes(): void {
    this.apiRouter.post(
      '/categorys',
      (req, res, next) => this.categoryController.create(req, res, next)
    );
    this.apiRouter.put(
      '/categorys/:id',
      (req, res, next) => this.categoryController.update(req, res, next)
    )
    this.apiRouter.get(
      '/categorys',
      (req, res, next) => this.categoryController.getAll(req, res, next)
    )
    this.apiRouter.get(
      '/categorys/:id',
      (req, res, next) => this.categoryController.getById(req, res, next)
    )
    this.apiRouter.delete(
      '/categorys/:id',
      (req, res, next) => this.categoryController.delete(req, res, next)
    )
  }

  private setProductApiRoutes(): void {
    this.apiRouter.post(
      '/stores/:storeId/products',
      (req, res, next) => this.productController.create(req, res, next)
    );
    this.apiRouter.put(
      '/stores/:storeId/products/:id',
      (req, res, next) => this.productController.update(req, res, next)
    );
    this.apiRouter.get(
      '/products/:id',
      (req, res, next) => this.productController.getById(req, res, next)
    );
    this.apiRouter.get(
      '/products',
      (req, res, next) => this.productController.getAll(req, res, next)
    );
    this.apiRouter.get(
      '/stores/:storeId/products',
      (req, res, next) => this.productController.getAllByStore(req, res, next)
    );
    this.apiRouter.get(
      '/products?category=categoryId',
      (req, res, next) => this.productController.getAllByCategory(req, res, next)
    );
    this.apiRouter.get(
      '/products?min=min&max=max',
      (req, res, next) => this.productController.getAllByRange(req, res, next)
    );
    this.apiRouter.delete(
      '/stores/:storeId/products/:id',
      (req, res, next) => this.productController.delete(req, res, next)
    );
    this.apiRouter.patch(
      '/stores/:storeId/products/:id',
      (req, res, next) => this.productController.updateStock(req, res, next)
    );
  }

  private setCartApiRoutes(): void {
    this.apiRouter.post(
      '/carts',
      (req, res, next) => this.cartController.create(req, res, next)
    );
    this.apiRouter.get(
      '/carts',
      (req, res, next) => this.cartController.getAll(req, res, next)
    );
    this.apiRouter.get(
      '/carts/:id',
      (req, res, next) => this.cartController.getById(req, res, next)
    );
    this.apiRouter.get(
      '/user/:id/carts',
      (req, res, next) => this.cartController.getByUId(req, res, next)
    );
    this.apiRouter.delete(
      '/carts/:id',
      (req, res, next) => this.cartController.delete(req, res, next)
    );
  }

  private setOrderApiRoutes(): void {
    this.apiRouter.post(
      '/orders',
      (req, res, next) => this.orderController.create(req, res, next)
    );
    this.apiRouter.put(
      '/orders',
      (req, res, next) => this.orderController.update(req, res, next)
    );
    this.apiRouter.get(
      '/orders',
      (req, res, next) => this.orderController.getAll(req, res, next)
    );
    this.apiRouter.get(
      '/orders/:id',
      (req, res, next) => this.orderController.getById(req, res, next)
    );
    this.apiRouter.delete(
      '/orders/:id',
      (req, res, next) => this.orderController.delete(req, res, next)
    );
  }

  private setReviewApiRoutes(): void {
    this.apiRouter.post(
      '/reviews',
      (req, res, next) => this.reviewController.create(req, res, next)
    );
    this.apiRouter.put(
      '/reviews/:id',
      (req, res, next) => this.reviewController.update(req, res, next)
    );
    this.apiRouter.get(
      '/reviews',
      (req, res, next) => this.reviewController.getAll(req, res, next)
    );
    this.apiRouter.get(
      '/reviews/:id',
      (req, res, next) => this.reviewController.getById(req, res, next)
    );
    this.apiRouter.get(
      '/reviews?proudctId=pid',
      (req, res, next) => this.reviewController.getByPId(req, res, next)
    );
    this.apiRouter.delete(
      '/reviews/:id',
      (req, res, next) => this.reviewController.delete(req, res, next)
    );
  }

  private setSaleApiRoutes():void{
    this.apiRouter.get(
      '/sales',
      (req, res, next) => this.saleController.getAllSales(req, res, next)
    )
    this.apiRouter.get(
      '/store/:storeId/sales',
      (req, res, next) => this.saleController.getStoreSales(req, res, next)
    )
  }

  private setUserApiRouters():void{
    this.apiRouter.put(
      '/users/:id',
      (req, res, next) => this.userController.update(req, res, next)
    )
    this.apiRouter.get(
      '/users',
      (req, res, next) => this.userController.getAll(req, res, next)
    )
    this.apiRouter.get(
      '/users/:id',
      (req, res, next) => this.userController.getById(req, res, next)
    )
    this.apiRouter.get(
      '/users/:email',
      (req, res, next) => this.userController.getByUserEmail(req, res, next)
    )
    this.apiRouter.delete(
      '/users/:id',
      (req, res, next) => this.userController.delete(req, res, next)
    )
  }

  private setStoreApiRouters():void{
    this.apiRouter.put(
      '/stores/:id',
      (req, res, next) => this.storeController.update(req, res, next)
    )
    this.apiRouter.get(
      '/stores',
      (req, res, next) => this.storeController.getAll(req, res, next)
    )
    this.apiRouter.get(
      '/stores/:id',
      (req, res, next) => this.storeController.getById(req, res, next)
    )
    this.apiRouter.get(
      '/stores/:email',
      (req, res, next) => this.storeController.getByUserEmail(req, res, next)
    )
    this.apiRouter.delete(
      '/stores/:id',
      (req, res, next) => this.storeController.delete(req, res, next)
    )
  }

}
