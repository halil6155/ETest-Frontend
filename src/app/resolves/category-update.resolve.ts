import { Injectable } from '@angular/core';
import { CategorySingleModel } from '@app/models/category/categorySingleModel';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { CategoryService } from '@app/services/category.service';
import { AlertifyService } from '@app/services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CategoryUpdateResolve implements Resolve<CategorySingleModel>{
    constructor(private router:Router,private categoryService:CategoryService,private alertifyService:AlertifyService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CategorySingleModel | Observable<CategorySingleModel> | Promise<CategorySingleModel> {
        return this.categoryService.getById(route.params['id'])
        .pipe(catchError(()=>{
            this.alertifyService.error('Bir Hata Oluştu!Tekrar Deneyiniz');
            this.router.navigateByUrl('/');
            return of(null)
        }));
    }
}