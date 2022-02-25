import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookiSession: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try{
      const token = this.cookiSession.get('token')
      let newRequest = request
      newRequest = request.clone({
        setHeaders: {
          authorization:`Bearer ${token}`
        }
      })
      return next.handle(newRequest);
    }catch(e){
      console.log('CUIDADO ERROR ',e)
      return next.handle(request);
    }
  }
}
