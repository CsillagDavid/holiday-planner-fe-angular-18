import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiRoutes } from "../api/api-routes";
import { Destination } from "../api/models/destination.model";
import { TravelDay } from "../api/models/travel-day.model";
import { Activity } from "../api/models/activity.model";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) { }

    updateActivities(activities: Activity[]): Observable<Activity[]> {
        return this.http.put<Activity[]>(ApiRoutes.activity.updateActivities, activities, { headers: this.headers });
    }
    
    update(activity: Activity): Observable<Activity> {
        return this.http.put<Activity>(ApiRoutes.activity.update, activity, { headers: this.headers });
    }
}