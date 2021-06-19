import { OperationClaimUpdateModel } from '@app/models/operationClaim/operationClaimUpdateModel';
import { OperationClaimSingleModel } from '@app/models/operationClaim/operationClaimSingleModel';
import { DataResponseModel } from '@app/models/response/dataResponse';
import { OperationClaimAddModel } from '@app/models/operationClaim/operationClaimAddModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OperationClaimListModel } from '@app/models/operationClaim/operationClaimListModel';
import { BaseResponseModel } from '@app/models/response/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {
  private baseUrl = `${environment.baseUrl}operationClaims/`;
  constructor(private httpClient:HttpClient) { }
  add(operationClaimAddModel:OperationClaimAddModel){
    return this.httpClient.post<BaseResponseModel>(`${this.baseUrl}add`,operationClaimAddModel);
  }
  getList(){
    return this.httpClient.get<DataResponseModel<OperationClaimListModel[]>>(`${this.baseUrl}getList`);
  }
  getById(id:number){
    return this.httpClient.get<DataResponseModel<OperationClaimSingleModel>>(`${this.baseUrl}getById/${id}`);
  }
  update(operationClaimUpdateModel:OperationClaimUpdateModel){
    return this.httpClient.put<BaseResponseModel>(`${this.baseUrl}update`,operationClaimUpdateModel);
  }
}
