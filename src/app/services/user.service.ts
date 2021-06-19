import { UserUpdateModel } from '@app/models/user/userUpdateModel';
import { UserOperationClaimAddModel } from '@app/models/user/userOperationClaimAddModel';
import { BaseResponseModel } from '@app/models/response/baseResponse';
import { UserOperaionClaimModel } from '@app/models/user/userOperaionClaimModel';
import { UserListModel } from '@app/models/user/userListModel';
import { DataResponseModel } from '@app/models/response/dataResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserSingleModel } from '@app/models/user/userSingleModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.baseUrl}users/`;
  constructor(private httpClient: HttpClient) {}
  getList() {
    return this.httpClient.get<DataResponseModel<UserListModel[]>>(
      `${this.baseUrl}getList`
    );
  }
  getById(id:number){
    return this.httpClient.get<DataResponseModel<UserSingleModel>>(`${this.baseUrl}getById/${id}`);
  }
  getUserOperationClaimById(id: number) {
    return this.httpClient.get<DataResponseModel<UserOperaionClaimModel[]>>(
      `${environment.baseUrl}UserOperationClaims/getUserClaims/${id}`
    );
  }
  addOperationClaim(userOperationClaimAddModel: UserOperationClaimAddModel[]) {
    return this.httpClient.post<BaseResponseModel>(
      `${environment.baseUrl}UserOperationClaims/add/`,
      userOperationClaimAddModel
    );
  }
  update(userUpdateModel:UserUpdateModel){
    return this.httpClient.put(`${this.baseUrl}update`,userUpdateModel);
  }
  imageUpload(image:FormData){
    return this.httpClient.post(`${this.baseUrl}imageUpload`,image);
  }
}
