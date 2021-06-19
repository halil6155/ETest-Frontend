import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AlertifyService } from "@app/services/alertify.service";
import { AuthService } from "@app/services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private router:Router,private alertifyService:AlertifyService,private authService:AuthService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.loggedIn()){
            return true;
        }
        else{
         this.router.navigateByUrl('/login');
         this.alertifyService.error('Önce Giriş Yapmanız Gerekiyor!');
         return false;
        }
    }
}