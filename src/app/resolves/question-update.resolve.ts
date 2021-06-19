import { QuestionService } from '@app/services/question.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { QuestionSingleModel } from "@app/models/question/questionSingleModel";
import { Observable, of } from "rxjs";
import { AlertifyService } from '@app/services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class QuestionUpdateResolve implements Resolve<QuestionSingleModel>{
    constructor(private router:Router,private questionService:QuestionService,private alertifyService:AlertifyService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QuestionSingleModel | Observable<QuestionSingleModel> | Promise<QuestionSingleModel> {
        return this.questionService.getById(route.params['id'])
        .pipe(catchError(()=>{
            this.alertifyService.error('Bir Hata Oluştu!Tekrar Deneyiniz');
            this.router.navigateByUrl('/');
            return of(null)
        }));
    }

}