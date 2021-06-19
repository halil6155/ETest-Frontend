import { RefreshTokenModel } from '@app/models/token/refreshTokenModel';
import { UserLoginModel } from '@app/models/user/userLoginModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterModel } from '@app/models/user/userRegisterModel';
import { BaseResponseModel } from '@app/models/response/baseResponse';
import { TokenModel } from '@app/models/token/tokenModel';
import { map } from 'rxjs/operators';
import { DataResponseModel } from '@app/models/response/dataResponse';
import { DecodedTokenModel } from '@app/models/token/decodedTokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = 'TOKEN_KEY';
  jwtHelper = new JwtHelperService();
  refreshTokenKey = 'REFRESH_TOKEN_KEY';
  decodedTokenModel: DecodedTokenModel;
  private baseUrl = `${environment.baseUrl}auth/`;
  constructor(private httpClient: HttpClient) {}
  register(userRegisterModel: UserRegisterModel) {
    return this.httpClient.post<BaseResponseModel>(
      `${this.baseUrl}register`,
      userRegisterModel
    );
  }
  login(userLoginModel: UserLoginModel) {
    return this.httpClient
      .post<DataResponseModel<TokenModel>>(
        `${this.baseUrl}login`,
        userLoginModel
      )
      .pipe(
        map((result: DataResponseModel<TokenModel>) => {
          if (result.success) {
            this.localStorageSetToken(
              result.data.token,
              result.data.refreshToken
            );
            this.setDecodedToken();
         
          }
        })
      );
  }
  loggedIn() {
    const token = this.getAccessToken();
   if(token==null)return false;
    const isExpirated = this.jwtHelper.isTokenExpired(token);
    if(isExpirated){
      this.removeDecodedModel()
      this.removeAccessToken();
    }
     
    if (isExpirated && this.getRefreshToken()) {
      return this.refreshToken();
    }
    if(this.decodedTokenModel==null)
      this.setDecodedToken();
    return !isExpirated;
  }
  private refreshToken() {
    const tokenDto = new RefreshTokenModel();
    tokenDto.refreshToken = this.getRefreshToken();
    this.removeRefreshToken();
    this.httpClient.post(`${this.baseUrl}RefreshToken`, tokenDto).subscribe(
      (result:  DataResponseModel<TokenModel>) =>
        this.localStorageSetToken(result.data.token, result.data.refreshToken),
      ()=>{
        this.removeAccessToken();
        return false;
      }
    );
    return false;
  }
  private localStorageSetToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.tokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }
  getAccessToken() {
    return localStorage.getItem(this.tokenKey);
  }
  removeDecodedModel(){
    this.decodedTokenModel=null;
  }
  removeAccessToken() {
    this.removeDecodedModel();
    localStorage.removeItem(this.tokenKey);
  }
  setDecodedToken() {
    this.decodedTokenModel = this.jwtHelper.decodeToken(this.getAccessToken());
  }
  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }
  removeRefreshToken() {
    localStorage.removeItem(this.refreshTokenKey);
  }
}
