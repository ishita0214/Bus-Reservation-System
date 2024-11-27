import { Injectable } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


export const AuthInterceptor: HttpInterceptorFn=(req,next)=> {
  const tokenKey = 'token'; // Same key used in AuthService


    const token = localStorage.getItem(tokenKey);


    if (token) {
      // Clone the request and set the new header in one step
      console.log('Adding Authorization Header:', `Bearer ${token}`);
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Pass the cloned request instead of the original request to the next handle
      return next(cloned);
    }

    // If no token, pass the original request
    return next(req);
  }
