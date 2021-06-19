import { AlertifyService } from '@app/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ValidationService } from '@app/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup:FormGroup;
  constructor(private authService:AuthService,private router:Router,private alertifyService:AlertifyService,public validationService:ValidationService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }
  get getControls()
  { 
    return this.registerFormGroup.controls;
  } 

  createFormGroup(){
    this.registerFormGroup=new FormGroup({
      firstName:new FormControl('',[Validators.required,Validators.maxLength(25)]),
      lastName:new FormControl('',[Validators.required,Validators.maxLength(25)]),
      userName:new FormControl('',[Validators.required,Validators.maxLength(25)]),
      email:new FormControl('',[Validators.required,Validators.email,Validators.maxLength(50)]),
      dateOfBirth:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required,Validators.minLength(3)]),
    })
  }
  register(){
    if(this.registerFormGroup.valid){
      this.authService.register(this.registerFormGroup.value)
      .subscribe(result=>{
        this.alertifyService.success(result.message);
        this.router.navigateByUrl('/login');
      },(error)=>this.alertifyService.error(error));
    }
  }
}
