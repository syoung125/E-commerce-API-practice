import { Service, Inject } from "typedi";
import { PlanService } from './plan.service';
import { Plan } from './plan.model';

@Service()
export class PlanController {
    constructor(
        private planService: PlanService
    ){
        
    }

    /**
     * @api POST /plans
     * 
     * This method creates a new plan
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body){
            const plan = req.body;

            this.planService.create(plan)
                .then((newPlan: Plan) => {
                    res.send(newPlan);
                });
        }
    }

    /**
     * @api PUT /plans/:id
     * 
     * This method updates a plan that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req, res, next){
        if(req.body && req.params.id){
            const plan = req.body;
            plan.id = req.params.id;

            this.planService.update(plan)
                .then((updatedPlan: Plan | null) => {
                    res.send(updatedPlan);
                });
        }
    }


    /**
     * @api GET /plans
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        console.log(req.authUser)
        this.planService.findAll()
            .then((planList: Plan[]) => {
                res.send(planList);
            });
    }

    /**
     * @api GET /plans/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.planService.findById(req.params.id)
                .then((plan: Plan | null) => {
                    res.send(plan);
                });
        }
    }

    /**
     * @api DELETE /plans/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id){
            this.planService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }

}