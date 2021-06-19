import { CategoryUpdateModel } from '@app/models/category/categoryUpdateModel';
import { CategorySingleModel } from '@app/models/category/categorySingleModel';
import { CategoryListModel } from '@app/models/category/categoryListModel';

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryAddModel } from '@app/models/category/categoryAddModel';
import { BaseResponseModel } from '@app/models/response/baseResponse';
import { DataResponseModel } from '@app/models/response/dataResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl=`${environment.baseUrl}categories/`
  constructor(private httpClient:HttpClient) { }

  add(categoryAddModel:CategoryAddModel){
    return this.httpClient.post<BaseResponseModel>(`${this.baseUrl}add`,categoryAddModel);
  }
  getList(){
    return this.httpClient.get<DataResponseModel<CategoryListModel[]>>(`${this.baseUrl}getList`);
  }
  getById(id:number){
    return this.httpClient.get<DataResponseModel<CategorySingleModel>>(`${this.baseUrl}getById/${id}`);
  }
  update(categoryUpdateModel:CategoryUpdateModel){
    return this.httpClient.put<BaseResponseModel>(`${this.baseUrl}update`,categoryUpdateModel);
  }
}
