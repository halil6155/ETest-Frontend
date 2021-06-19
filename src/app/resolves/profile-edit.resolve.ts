import { AuthService } from '@app/services/auth.service';
import { AlertifyService } from '@app/services/alertify.service';
import { UserService } from '@app//services/user.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { UserSingleModel } from "@app/models/user/userSingleModel";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable()
export class ProfileEditResolve implements Resolve<UserSingleModel>{
    constructor(private router:Router,private userService:UserService,private alertifyService:AlertifyService,private authService:AuthService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserSingleModel | Observable<UserSingleModel> | Promise<UserSingleModel> {
        return this.userService.getById(route.params['id'])
        .pipe(catchError(()=>{
            this.alertifyService.error('Bir Hata Oluştu!Tekrar Deneyiniz');
            this.router.navigateByUrl('/');
            return of(null)
        }));
    }

}