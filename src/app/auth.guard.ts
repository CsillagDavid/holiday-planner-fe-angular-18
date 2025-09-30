// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable, map, catchError, of, take, tap, switchMap } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const currentUrl = state.url;

        // Ha login vagy register oldalra navigál, akkor nem ellenőrzünk auth-ot
        if (currentUrl === '/login' || currentUrl === '/register') {
            return of(true);
        }

        return this.authService.isLoggedIn$().pipe(
            take(1),
            switchMap((isLoggedIn: boolean | null) => {
                if (isLoggedIn === null) {
                    return this.authService.checkAuth(); // Observable<boolean>
                } else {
                    return of(isLoggedIn);
                }
            }),
            map((isLoggedIn: boolean) => this.manageIsLoggedIn(isLoggedIn))
        );
        // return of(true);
    }

    private manageIsLoggedIn(isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    // // Minden más esetben csak bejelentkezve engedjük tovább
    // if (!this.authService.isLoggedIn()) {
    //     this.router.navigate(['/login']);
    //     return false;
    // }

    // return true;
    // constructor(private router: Router) { }

    // canActivate(): boolean | UrlTree {
    //     const token = localStorage.getItem('token');

    //     if (this.isTokenValid(token)) {
    //         return true;
    //     }

    //     return this.router.parseUrl('login');
    // }

    // isTokenValid(token: string | null) {
    //     return token?.length && token.length > 0;
    // }
}