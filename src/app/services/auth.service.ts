import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { ApiRoutes } from "../api/api-routes";
import { LoginRequest, LoginResponse } from "../api/models/auth.model";
import { Router } from "@angular/router";
import { errorContext } from "rxjs/internal/util/errorContext";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private options = { headers: this.headers, withCredentials: true };

    private loggedIn$ = new BehaviorSubject<boolean | null>(null);

    constructor(private http: HttpClient, private router: Router) { }

    loginWithCookie(loginRequest: LoginRequest): Observable<any> {
        return this.http.post<any>(ApiRoutes.auth.loginWithCookie, loginRequest, this.options).pipe(
            tap(() => {
                this.loggedIn$.next(true);
            })
        );
    }

    isLoggedIn(): boolean | null {
        return this.loggedIn$.getValue();
    }

    isLoggedIn$(): Observable<boolean | null> {
        return this.loggedIn$.asObservable();
    }

    checkAuth(): Observable<boolean> {
        return this.http.get<boolean>(ApiRoutes.auth.checkAuth, this.options).pipe(
            tap((res) => {
                this.loggedIn$.next(true);
                console.log(true);
            }),
            catchError((err) => {
                this.loggedIn$.next(false);
                return of(false);
            })
        );
    }

    logout() {
        this.http.post(ApiRoutes.auth.logout, {}, { withCredentials: true }).subscribe({
            next: () => {
                this.loggedIn$.next(false);
                this.router.navigate(['/login']);
            },
            error: () => {
                this.loggedIn$.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

}