import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiRoutes } from "../api/api-routes";
import { TravelDay } from "../api/models/travel-day.model";

@Injectable({
    providedIn: 'root'
})
export class TravelDayService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private options = { headers: this.headers, withCredentials: true };

    constructor(private http: HttpClient) { }

    getTravelDay(travelDayId: number): Observable<TravelDay> {
        return this.http.get<TravelDay>(ApiRoutes.travelDay.getById(travelDayId), { headers: this.headers });
    }

    updateTravelDay() {
        throw new Error('Method not implemented.');
    }

    deleteTravelDay() {
        throw new Error('Method not implemented.');
    }
}