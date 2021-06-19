import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  getValidation(control:AbstractControl,name:string){
 
    if(control.errors){
      for(let error in control.errors){
        if(error=="required"){
          return `${name} Alanı Boş Geçilemez!`
        }
       else if(error=="email"){
          return `${name} Alanı Formatında Hata Var!`
        }
        else if(error=="minlength"){
          return `${name} Alanı En Az ${control.errors[error].requiredLength} Karakter Olmalıdır!`
        }
        else if(error=="maxlength"){
          return `${name} Alanı En Fazla ${control.errors[error].requiredLength} Karakter Olmalıdır!`
        }
      }
    }
  }
}
