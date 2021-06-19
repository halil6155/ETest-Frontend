import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AlertifyService } from "@app/services/alertify.service";
import { AuthService } from "@app/services/auth.service";
import { SystemRoles } from "@app/static/roles";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private alertifyService: AlertifyService, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authService.loggedIn()) {
            const roles = this.authService.decodedTokenModel.actort;
            if (typeof roles === 'string') {
                if (roles == SystemRoles.admin) {
                    return true;
                }
            }
            else {
                for (let role of roles) {
                    if (role == SystemRoles.admin) {
                        return true;
                    }
                }
            }
        }
        this.router.navigateByUrl('/');
        return false;
    }
}