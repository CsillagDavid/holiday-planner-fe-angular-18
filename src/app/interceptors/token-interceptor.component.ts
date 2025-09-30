// src/app/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';

const excludedRoutes = ['/login', "/signin"]

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    // if (excludedRoutes.find(x => req.url.includes(x))) {
    //     return next(req);
    // }
    const cloned = req.clone({
        withCredentials: true
    });
    return next(cloned);
}
