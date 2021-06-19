import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainResultModel } from '@app/models/main/mainResultModel';
import { DataResponseModel } from '@app/models/response/dataResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseUrl = `${environment.baseUrl}mains/`;
  constructor(private httpClient:HttpClient) { }
  getMains(){
    return this.httpClient.get<DataResponseModel<MainResultModel>>(`${this.baseUrl}mainResult`);
  }
}
