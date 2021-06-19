import { BaseResponseModel } from "./baseResponse";

export interface DataResponseModel<T> extends BaseResponseModel{
    data:T
}