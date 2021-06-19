import { AlertifyService } from '@app/services/alertify.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OperationClaimSingleModel } from '@app/models/operationClaim/operationClaimSingleModel';
import { OperationClaimService } from '@app/services/operation-claim.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class OperationClaimResolve
  implements Resolve<OperationClaimSingleModel>
{
  constructor(
    private router: Router,
    private operationClaimService: OperationClaimService,
    private alertifyService: AlertifyService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | OperationClaimSingleModel
    | Observable<OperationClaimSingleModel>
    | Promise<OperationClaimSingleModel> {
    return this.operationClaimService.getById(route.params['id']).pipe(
      catchError(() => {
        this.alertifyService.error('Bir Hata Oluştu!Tekrar Deneyiniz');
        this.router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}
