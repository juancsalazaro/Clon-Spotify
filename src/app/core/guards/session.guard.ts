import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private cokieService:CookieService, private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCokieSession()
  }

  checkCokieSession():boolean{
    try{
      const token:boolean = this.cokieService.check('token')
      if (!token) {
        this.router.navigate(['/','auth'])
      }
      return token
    }catch(e){
      console.log("Algo Sucedio??",e)
      return false
    }
  }
}
