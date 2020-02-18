import { Service, Inject } from "typedi";
import { ReviewRepository } from './repository/review.repository';
import { Review } from './review.model';

@Service()
export class ReviewService {
    constructor(
        @Inject('review.repository') private reviewRepository: ReviewRepository
    ){}

    async create(review: Review): Promise<Review>{
        return await this.reviewRepository.create(review);
    }

    async update(review: Review): Promise<Review | null>{
        return await this.reviewRepository.update(review);
    }

    async findById(reviewId: string): Promise<Review | null>{
        return await this.reviewRepository.findById(reviewId);
    }

    async findByProductId(productId: string): Promise<Array<Review>>{
        return await this.reviewRepository.findByProductId(productId);
    }

    async findAll(): Promise<Array<Review>>{
        return await this.reviewRepository.findAll();
    }
    
    async delete(reviewId: string): Promise<null>{
        return await this.reviewRepository.delete(reviewId);
    }
}