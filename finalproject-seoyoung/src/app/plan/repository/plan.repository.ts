import { Plan } from '../plan.model';

export interface PlanRepository {
    create(plan: Plan): Promise<Plan>;
    update(plan: Plan): Promise<Plan | null>;
    findById(planId: string): Promise<Plan | null>;
    findAll(): Promise<Array<Plan>>;
    delete(planId: string): Promise<null>;
}