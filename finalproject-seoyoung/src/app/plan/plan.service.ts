import { Service, Inject } from "typedi";
import { PlanRepository } from './repository/plan.repository';
import { Plan } from './plan.model';

@Service()
export class PlanService {
    constructor(
        @Inject('plan.repository') private planRepository: PlanRepository
    ){}

    async create(plan: Plan): Promise<Plan>{
        return await this.planRepository.create(plan);
    }

    async update(plan: Plan): Promise<Plan | null>{
        return await this.planRepository.update(plan);
    }

    async findById(planId: string): Promise<Plan | null>{
        return await this.planRepository.findById(planId);
    }

    async findAll(): Promise<Array<Plan>>{
        return await this.planRepository.findAll();
    }
    
    async delete(planId: string): Promise<null>{
        return await this.planRepository.delete(planId);
    }
}