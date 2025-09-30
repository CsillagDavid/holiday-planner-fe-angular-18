import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, merge, Observable, take, tap } from "rxjs";
import { ApiRoutes } from "../api/api-routes";
import { User } from "../api/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user$ = new BehaviorSubject<User | null>(null);

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private options = { headers: this.headers, withCredentials: true };

    constructor(private http: HttpClient) { }

    getUser(): Observable<any> {
        if (this.user$.value !== null) {
            return this.user$.asObservable();
        }
        return this.http.get<any>(ApiRoutes.user.getCurrentUserInfo, this.options).pipe(
            tap((user) => {
                this.user$.next(user);
            })
        );
    }
}