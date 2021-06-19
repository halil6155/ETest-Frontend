import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '@app/services/alertify.service';
import { AuthService } from '@app/services/auth.service';
import { ValidationService } from '@app/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup:FormGroup;
  constructor(private authService:AuthService,private router:Router,private alertifyService:AlertifyService,public validationService:ValidationService) { }

  ngOnInit(): void {
    this.createLoginFormGroup();
  }
  get getControls()
  { 
    return this.loginFormGroup.controls;
  }   
  createLoginFormGroup(){
    this.loginFormGroup=new FormGroup({
      email:new FormControl("",[Validators.email,Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
      password:new FormControl("",[Validators.required,Validators.minLength(3)]),
    });
  }
  login(){
    if(this.loginFormGroup.valid){
      this.authService.login(this.loginFormGroup.value).subscribe(()=>{
       this.alertifyService.success("Giriş Başarılı!");
       this.router.navigateByUrl('/');
      },(error)=>this.alertifyService.error(error))
    }
  }
}
