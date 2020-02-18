import { CategoryService } from './category.service';
import { Category } from './category.model';

export class CategoryController
{
    constructor(private categoryService: CategoryService){

    }

     /**
     * @api POST /categorys
     * 
     * This method creates a new category
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body){
            const category = req.body;

            this.categoryService.create(category)
            .then((newCategory: Category) => {
                res.send(newCategory);
            });
        }
    }

    /**
     * @api PUT /categorys/:id
     * 
     * This method updates a category that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req, res, next){
        if(req.body && req.params.id){
            const category = req.body;
            category.id = req.parama.id;

            this.categoryService.update(category)
            .then((updateCategory: Category | null) => {
                res.send(updateCategory);
            });
        }
    }

    /**
     * @api GET /categorys
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        this.categoryService.findAll()
        .then((categoryList: Category[]) => {
            res.send(categoryList);
        });
    }


    /**
     * @api GET /categorys/:id
     * 
     * Find category by Id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.categoryService.findById(req.params.id)
            .then((category: Category | null) => {
                res.send(category);
            });
        }
    }

    /**
     * @api DELETE /categorys/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id){
            this.categoryService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }
    
}