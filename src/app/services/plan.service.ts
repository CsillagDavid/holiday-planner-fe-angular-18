import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiRoutes } from "../api/api-routes";
import { Plan } from "../api/models/plan.model";

@Injectable({
	providedIn: 'root'
})
export class PlanService {
    
    private headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(private http: HttpClient) { }

    getPlan(planId: number):  Observable<Plan>{
        return this.http.get<Plan>(ApiRoutes.plans.getById(planId), {headers: this.headers});
    }

    getPlans(): Observable<Plan[]>{
        return this.http.get<Plan[]>(ApiRoutes.plans.getAll, {headers: this.headers});
    }
}