import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(catchError((error: HttpErrorResponse) => {
            if(error.status === 400) {
                if (error.error) {                          
                    return throwError('Hatalı İşlem!Tekrar Deneyiniz...')
                }   
                if(error.error.errors) {
                    const serverError = error.error;
                    let errorMessage='';
                    for (const key in serverError.errors) {
                        errorMessage += serverError.errors[key] + '\n';
                    }
                    return throwError(errorMessage);
                }
                return throwError(error.error.message);
            }
            if(error.status === 401) {
                return throwError("Yetkisiz Erişim Giriş Yapın!");
            }
            if (error.status === 500) {
                return throwError('Sunucuya Şuan Ulaşılamıyor!');
            }
            else{
                return throwError('Bir Hata Oluştu!');
            }
        }));
    }
}