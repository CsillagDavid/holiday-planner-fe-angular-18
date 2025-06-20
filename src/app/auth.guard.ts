// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    UrlTree
} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean | UrlTree {
        const token = localStorage.getItem('token');

        if (this.isTokenValid(token)) {
            return true;
        }

        return this.router.parseUrl('login');
    }

    isTokenValid(token: string | null) {
        return token?.length && token.length > 0;
    }
}