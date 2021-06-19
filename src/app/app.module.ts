import { ErrorInterceptor } from './interceptors/error.interceptors';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MainModule } from './modules/main/main.module';
import { AppRoutingModule } from './app-routing.module';
export function tokenGetter() {
  return localStorage.getItem('TOKEN_KEY');
}

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [

    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MainModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:20170'],
        disallowedRoutes: [`${environment.baseUrl}auth`],
      },
    })
  ],
  providers: [ {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
