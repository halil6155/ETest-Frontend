import { UserService } from '@app//services/user.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserOperaionClaimModel } from '@app/models/user/userOperaionClaimModel';
import { AlertifyService } from '@app/services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable()
export class UserOperationClaimUpdateResolve
  implements Resolve<UserOperaionClaimModel>
{
  constructor(
    private router: Router,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | UserOperaionClaimModel
    | Observable<UserOperaionClaimModel>
    | Promise<UserOperaionClaimModel> {
    return this.userService.getUserOperationClaimById(route.params['id']).pipe(
      catchError(() => {
        this.alertifyService.error('Bir Hata Oluştu!Tekrar Deneyiniz');
        this.router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}
