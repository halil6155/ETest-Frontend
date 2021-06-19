import { BaseResponseModel } from '@app/models/response/baseResponse';
import { QuestionSingleModel } from '@app/models/question/questionSingleModel';
import { DataResponseModel } from '@app/models/response/dataResponse';
import { QuestionAddModel } from '@app/models/question/questionAddModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionListModel } from '@app/models/question/questionListModel';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = `${environment.baseUrl}questions/`;
  constructor(private httpClient:HttpClient) { }
  add(questionAddModel:QuestionAddModel){
    return this.httpClient.post<BaseResponseModel>(`${this.baseUrl}add`,questionAddModel);
  }
  getById(id:number){
    return this.httpClient.get<DataResponseModel<QuestionSingleModel>>(`${this.baseUrl}getById/${id}`);
  }
  getList(){
    return this.httpClient.get<DataResponseModel<QuestionListModel[]>>(`${this.baseUrl}getList`)
  }
  getUserAndCategoryId(userId:number,categoryId:number){
    return this.httpClient.get<DataResponseModel<QuestionSingleModel>>(`${this.baseUrl}getByUserAndCategoryId/${categoryId}/${userId}`);
  }
 
}
