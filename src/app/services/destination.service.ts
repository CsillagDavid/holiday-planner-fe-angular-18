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
export class DestinationService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private options = { headers: this.headers, withCredentials: true };

    constructor(private http: HttpClient) { }
}