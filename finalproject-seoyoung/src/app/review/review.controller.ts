import { Service, Inject } from "typedi";
import { ReviewService } from './review.service';
import { Review } from './review.model';

@Service()
export class ReviewController {
    constructor(
        private reviewService: ReviewService
    ){
        
    }

    /**
     * @api POST /reviews
     * 
     * This method creates a new review
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body){
            const review = req.body;

            this.reviewService.create(review)
                .then((newReview: Review) => {
                    res.send(newReview);
                });
        }
    }

    /**
     * @api PUT /reviews/:id
     * 
     * This method updates a review that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req, res, next){
        if(req.body && req.params.id){
            const review = req.body;
            review.id = req.params.id;

            this.reviewService.update(review)
                .then((updatedReview: Review | null) => {
                    res.send(updatedReview);
                });
        }
    }


    /**
     * @api GET /reviews
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        console.log(req.authUser)
        this.reviewService.findAll()
            .then((reviewList: Review[]) => {
                res.send(reviewList);
            });
    }

    /**
     * @api GET /reviews/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.reviewService.findById(req.params.id)
                .then((review: Review | null) => {
                    res.send(review);
                });
        }
    }

    /**
     * @api GET /reviews?productId=pId
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getByPId(req, res, next){
        if(req.query.productId){
            this.reviewService.findByProductId(req.query.productId)
                .then((reviewList: Review[]) => {
                    res.send(reviewList);
                });
        }
    }

    /**
     * @api DELETE /reviews/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id){
            this.reviewService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }

}