import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiRoutes } from "../api/api-routes";
import { Plan } from "../api/models/plan.model";
import { TravelDay } from "../api/models/travel-day.model";

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private options = { headers: this.headers, withCredentials: true };

    constructor(private http: HttpClient) { }

    addPlan(plan: Plan): Observable<Plan> {
        return this.http.post<Plan>(ApiRoutes.plan.addPlan, plan, { headers: this.headers });
    }

    updatePlan(plan: Plan): Observable<Plan> {
        return this.http.put<Plan>(ApiRoutes.plan.updatePlan, plan, { headers: this.headers });
    }

    getPlan(planId: number): Observable<Plan> {
        return this.http.get<Plan>(ApiRoutes.plan.getById(planId), { headers: this.headers });
    }

    deletePlan(planId: number) {
        return this.http.delete<Plan>(ApiRoutes.plan.deletePlan(planId), { headers: this.headers });
    }

    upsertTravelDay(planId: number, travelDay: TravelDay) {
        return this.http.post<Plan>(ApiRoutes.plan.upsertTravelDay(planId), travelDay, { headers: this.headers });
    }

    getPlans(): Observable<Plan[]> {
        return this.http.get<Plan[]>(ApiRoutes.plan.getByUser, this.options);
    }
}