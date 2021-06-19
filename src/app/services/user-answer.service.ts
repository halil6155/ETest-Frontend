import { UserAnswerAddModel } from '@app/models/userAnswer/userAnswerAddModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponseModel } from '@app/models/response/baseResponse';
import { environment } from 'src/environments/environment';
import { UserAnswerResultModel } from '@app/models/userAnswer/userAnswerResultModel';
import { DataResponseModel } from '@app/models/response/dataResponse';
import { UserAnswerListResultModel } from '@app/models/userAnswer/userAnswerListResultModel';
import { UserAnswerMainResultListModel } from '@app/models/userAnswer/userAnswerMainResultListModel';

@Injectable({
  providedIn: 'root'
})
export class UserAnswerService {
  private baseUrl = `${environment.baseUrl}userAnswers/`;
  constructor(private httpClient:HttpClient) { }
  add(userAnswerAddModel:UserAnswerAddModel){
    return this.httpClient.post<BaseResponseModel>(`${this.baseUrl}add`,userAnswerAddModel);
  }
  getResult(userId:number,categoryId:number){
    return this.httpClient.get<DataResponseModel<UserAnswerResultModel>>(`${this.baseUrl}getResult/${categoryId}/${userId}`);
  }
  getUserResults(userId:number){
    return this.httpClient.get<DataResponseModel<UserAnswerListResultModel[]>>(`${this.baseUrl}getUserResults/${userId}`);
  }
  getUserMainResults(userId:number){
    return this.httpClient.get<DataResponseModel<UserAnswerMainResultListModel[]>>(`${this.baseUrl}getMainResults/${userId}`)
  }
}
